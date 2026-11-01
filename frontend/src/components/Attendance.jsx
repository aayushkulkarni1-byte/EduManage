import { useState } from "react";
import {
  Search,
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
  Users
} from "lucide-react";

import attendanceData from "../data/attendance.json";

function Attendance() {
  const [attendance, setAttendance] = useState(attendanceData);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAttendance = attendance.filter((record) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      record.studentName.toLowerCase().includes(searchText) ||
      record.studentId.toLowerCase().includes(searchText);

    const matchesClass =
      classFilter === "All" ||
      record.class === classFilter;

    const matchesStatus =
      statusFilter === "All" ||
      record.status === statusFilter;

    return (
      matchesSearch &&
      matchesClass &&
      matchesStatus
    );
  });

  const presentCount = attendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (record) => record.status === "Absent"
  ).length;

  const lateCount = attendance.filter(
    (record) => record.status === "Late"
  ).length;

  const totalCount = attendance.length;

  const attendancePercentage =
    totalCount > 0
      ? Math.round((presentCount / totalCount) * 100)
      : 0;

  const changeAttendance = (id, newStatus) => {
    setAttendance(
      attendance.map((record) =>
        record.id === id
          ? {
              ...record,
              status: newStatus
            }
          : record
      )
    );
  };

  const getStatusClass = (status) => {
    if (status === "Present") {
      return "attendance-present";
    }

    if (status === "Absent") {
      return "attendance-absent";
    }

    return "attendance-late";
  };

  return (
    <main className="page">

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h2>Attendance</h2>

          <p>
            Monitor and manage daily student attendance.
          </p>
        </div>

        <div className="attendance-date">

          <CalendarDays size={17} />

          <span>
            03 October 2026
          </span>

        </div>

      </div>


      {/* STAT CARDS */}

      <div className="student-stats">

        <div className="student-stat-card">

          <div className="student-stat-icon blue">
            <Users size={20} />
          </div>

          <div>

            <span>Total Records</span>

            <strong>
              {totalCount}
            </strong>

          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon green">
            <CheckCircle size={20} />
          </div>

          <div>

            <span>Present</span>

            <strong>
              {presentCount}
            </strong>

          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon orange">
            <Clock size={20} />
          </div>

          <div>

            <span>Late</span>

            <strong>
              {lateCount}
            </strong>

          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon purple">
            <XCircle size={20} />
          </div>

          <div>

            <span>Attendance Rate</span>

            <strong>
              {attendancePercentage}%
            </strong>

          </div>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="content-card">

        {/* TOOLBAR */}

        <div className="student-toolbar">

          <div className="student-search">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search student name or ID..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="attendance-filters">

            <select
              value={classFilter}
              onChange={(e) =>
                setClassFilter(e.target.value)
              }
            >

              <option value="All">
                All Classes
              </option>

              <option value="10">
                Class 10
              </option>

              <option value="9">
                Class 9
              </option>

              <option value="8">
                Class 8
              </option>

            </select>


            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="Present">
                Present
              </option>

              <option value="Absent">
                Absent
              </option>

              <option value="Late">
                Late
              </option>

            </select>

          </div>

        </div>


        {/* ATTENDANCE TABLE */}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>Student</th>

                <th>Class</th>

                <th>Date</th>

                <th>Status</th>

                <th>Change Status</th>

              </tr>

            </thead>


            <tbody>

              {filteredAttendance.map(
                (record) => (

                  <tr key={record.id}>

                    <td>

                      <div className="student-name-cell">

                        <div className="student-avatar">
                          {record.studentName
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <strong>
                            {record.studentName}
                          </strong>

                          <span>
                            {record.studentId}
                          </span>

                        </div>

                      </div>

                    </td>


                    <td>
                      Class {record.class} -{" "}
                      {record.section}
                    </td>


                    <td>
                      {record.date}
                    </td>


                    <td>

                      <span
                        className={`attendance-status ${getStatusClass(
                          record.status
                        )}`}
                      >

                        {record.status ===
                          "Present" && (
                          <CheckCircle size={13} />
                        )}

                        {record.status ===
                          "Absent" && (
                          <XCircle size={13} />
                        )}

                        {record.status ===
                          "Late" && (
                          <Clock size={13} />
                        )}

                        {record.status}

                      </span>

                    </td>


                    <td>

                      <div className="attendance-actions">

                        <button
                          className={
                            record.status ===
                            "Present"
                              ? "selected-present"
                              : ""
                          }
                          onClick={() =>
                            changeAttendance(
                              record.id,
                              "Present"
                            )
                          }
                        >
                          Present
                        </button>


                        <button
                          className={
                            record.status ===
                            "Late"
                              ? "selected-late"
                              : ""
                          }
                          onClick={() =>
                            changeAttendance(
                              record.id,
                              "Late"
                            )
                          }
                        >
                          Late
                        </button>


                        <button
                          className={
                            record.status ===
                            "Absent"
                              ? "selected-absent"
                              : ""
                          }
                          onClick={() =>
                            changeAttendance(
                              record.id,
                              "Absent"
                            )
                          }
                        >
                          Absent
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>


          {filteredAttendance.length === 0 && (

            <div className="empty-students">

              <Users size={35} />

              <h3>
                No attendance records found
              </h3>

              <p>
                Try changing your search or filters.
              </p>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}

export default Attendance;