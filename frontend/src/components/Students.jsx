import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  UserRound,
  X
} from "lucide-react";

import studentsData from "../data/students.json";

function Students() {
  const [students, setStudents] = useState(studentsData);

  const [search, setSearch] = useState("");

  const [classFilter, setClassFilter] = useState("All");

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [showAddForm, setShowAddForm] =
    useState(false);

  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "10",
    section: "A",
    gender: "Male",
    parentName: "",
    parentPhone: "",
    email: ""
  });

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.studentId
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesClass =
      classFilter === "All" ||
      student.class === classFilter;

    return matchesSearch && matchesClass;
  });


  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    setStudents(
      students.filter((student) => student.id !== id)
    );
  };


  const handleAddStudent = (e) => {
    e.preventDefault();

    const nextId =
      Math.max(...students.map((student) => student.id)) + 1;

    const newStudentData = {
      id: nextId,
      studentId: `STU${String(nextId).padStart(3, "0")}`,
      name: newStudent.name,
      rollNumber: students.length + 1,
      gender: newStudent.gender,
      dateOfBirth: "2011-01-01",
      class: newStudent.class,
      section: newStudent.section,
      parentName: newStudent.parentName,
      parentPhone: newStudent.parentPhone,
      email: newStudent.email,
      address: "Thane, Maharashtra",
      admissionDate: "2026-06-01",
      status: "Active"
    };

    setStudents([
      ...students,
      newStudentData
    ]);

    setNewStudent({
      name: "",
      class: "10",
      section: "A",
      gender: "Male",
      parentName: "",
      parentPhone: "",
      email: ""
    });

    setShowAddForm(false);
  };


  const updateField = (field, value) => {
    setNewStudent({
      ...newStudent,
      [field]: value
    });
  };


  return (
    <main className="page">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>
          <h2>Students</h2>

          <p>
            Manage student records and information.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowAddForm(true)
          }
        >
          <Plus size={18} />
          Add Student
        </button>

      </div>


      {/* STAT CARDS */}

      <div className="student-stats">

        <div className="student-stat-card">

          <div className="student-stat-icon blue">
            <UserRound size={20} />
          </div>

          <div>
            <span>Total Students</span>
            <strong>{students.length}</strong>
          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon green">
            <UserRound size={20} />
          </div>

          <div>
            <span>Active Students</span>

            <strong>
              {
                students.filter(
                  (student) =>
                    student.status === "Active"
                ).length
              }
            </strong>

          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon purple">
            <UserRound size={20} />
          </div>

          <div>
            <span>Class 10</span>

            <strong>
              {
                students.filter(
                  (student) =>
                    student.class === "10"
                ).length
              }
            </strong>

          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon orange">
            <UserRound size={20} />
          </div>

          <div>
            <span>Class 9</span>

            <strong>
              {
                students.filter(
                  (student) =>
                    student.class === "9"
                ).length
              }
            </strong>

          </div>

        </div>

      </div>


      {/* TABLE CARD */}

      <div className="content-card">

        {/* FILTER BAR */}

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

        </div>


        {/* TABLE */}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>Student</th>

                <th>ID</th>

                <th>Class</th>

                <th>Gender</th>

                <th>Parent</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {filteredStudents.map(
                (student) => (

                  <tr key={student.id}>

                    <td>

                      <div className="student-name-cell">

                        <div className="student-avatar">
                          {student.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <strong>
                            {student.name}
                          </strong>

                          <span>
                            Roll No.{" "}
                            {student.rollNumber}
                          </span>

                        </div>

                      </div>

                    </td>


                    <td>
                      {student.studentId}
                    </td>


                    <td>
                      Class {student.class} -{" "}
                      {student.section}
                    </td>


                    <td>
                      {student.gender}
                    </td>


                    <td>

                      <div className="parent-cell">

                        <strong>
                          {student.parentName}
                        </strong>

                        <span>
                          {student.parentPhone}
                        </span>

                      </div>

                    </td>


                    <td>

                      <span
                        className={`status-badge ${
                          student.status ===
                          "Active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {student.status}
                      </span>

                    </td>


                    <td>

                      <div className="action-buttons">

                        <button
                          title="View"
                          onClick={() =>
                            setSelectedStudent(
                              student
                            )
                          }
                        >
                          <Eye size={16} />
                        </button>


                        <button
                          title="Edit"
                          onClick={() =>
                            alert(
                              "Edit functionality will be connected to the backend later."
                            )
                          }
                        >
                          <Pencil size={16} />
                        </button>


                        <button
                          title="Delete"
                          onClick={() =>
                            handleDelete(
                              student.id
                            )
                          }
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>


          {filteredStudents.length === 0 && (

            <div className="empty-students">

              <UserRound size={35} />

              <h3>
                No students found
              </h3>

              <p>
                Try changing your search or class filter.
              </p>

            </div>

          )}

        </div>

      </div>


      {/* VIEW STUDENT MODAL */}

      {selectedStudent && (

        <div className="modal-overlay">

          <div className="student-modal">

            <div className="modal-header">

              <div>

                <h3>
                  Student Details
                </h3>

                <p>
                  {selectedStudent.studentId}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedStudent(null)
                }
              >
                <X size={20} />
              </button>

            </div>


            <div className="student-profile">

              <div className="large-student-avatar">

                {selectedStudent.name
                  .charAt(0)
                  .toUpperCase()}

              </div>

              <h2>
                {selectedStudent.name}
              </h2>

              <span>
                Class {selectedStudent.class} -{" "}
                {selectedStudent.section}
              </span>

            </div>


            <div className="student-details-grid">

              <div>
                <label>Roll Number</label>
                <strong>
                  {selectedStudent.rollNumber}
                </strong>
              </div>

              <div>
                <label>Gender</label>
                <strong>
                  {selectedStudent.gender}
                </strong>
              </div>

              <div>
                <label>Date of Birth</label>
                <strong>
                  {selectedStudent.dateOfBirth}
                </strong>
              </div>

              <div>
                <label>Admission Date</label>
                <strong>
                  {selectedStudent.admissionDate}
                </strong>
              </div>

              <div>
                <label>Parent Name</label>
                <strong>
                  {selectedStudent.parentName}
                </strong>
              </div>

              <div>
                <label>Parent Phone</label>
                <strong>
                  {selectedStudent.parentPhone}
                </strong>
              </div>

              <div>
                <label>Email</label>
                <strong>
                  {selectedStudent.email}
                </strong>
              </div>

              <div>
                <label>Status</label>

                <span className="status-badge status-active">
                  {selectedStudent.status}
                </span>

              </div>

              <div className="student-address">

                <label>Address</label>

                <strong>
                  {selectedStudent.address}
                </strong>

              </div>

            </div>


            <button
              className="secondary-button modal-close"
              onClick={() =>
                setSelectedStudent(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* ADD STUDENT MODAL */}

      {showAddForm && (

        <div className="modal-overlay">

          <div className="student-modal add-student-modal">

            <div className="modal-header">

              <div>

                <h3>
                  Add New Student
                </h3>

                <p>
                  Enter student information below.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowAddForm(false)
                }
              >
                <X size={20} />
              </button>

            </div>


            <form onSubmit={handleAddStudent}>

              <div className="add-student-grid">

                <div className="modal-field full">

                  <label>
                    Student Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter student name"
                    value={newStudent.name}
                    onChange={(e) =>
                      updateField(
                        "name",
                        e.target.value
                      )
                    }
                    required
                  />

                </div>


                <div className="modal-field">

                  <label>
                    Class
                  </label>

                  <select
                    value={newStudent.class}
                    onChange={(e) =>
                      updateField(
                        "class",
                        e.target.value
                      )
                    }
                  >
                    <option>10</option>
                    <option>9</option>
                    <option>8</option>
                    <option>7</option>
                    <option>6</option>
                  </select>

                </div>


                <div className="modal-field">

                  <label>
                    Section
                  </label>

                  <select
                    value={newStudent.section}
                    onChange={(e) =>
                      updateField(
                        "section",
                        e.target.value
                      )
                    }
                  >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>

                </div>


                <div className="modal-field">

                  <label>
                    Gender
                  </label>

                  <select
                    value={newStudent.gender}
                    onChange={(e) =>
                      updateField(
                        "gender",
                        e.target.value
                      )
                    }
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>

                </div>


                <div className="modal-field">

                  <label>
                    Parent Name
                  </label>

                  <input
                    type="text"
                    placeholder="Parent / Guardian name"
                    value={newStudent.parentName}
                    onChange={(e) =>
                      updateField(
                        "parentName",
                        e.target.value
                      )
                    }
                    required
                  />

                </div>


                <div className="modal-field">

                  <label>
                    Parent Phone
                  </label>

                  <input
                    type="text"
                    placeholder="Phone number"
                    value={newStudent.parentPhone}
                    onChange={(e) =>
                      updateField(
                        "parentPhone",
                        e.target.value
                      )
                    }
                    required
                  />

                </div>


                <div className="modal-field">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Student email"
                    value={newStudent.email}
                    onChange={(e) =>
                      updateField(
                        "email",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setShowAddForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  <Plus size={17} />
                  Add Student
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}

export default Students;