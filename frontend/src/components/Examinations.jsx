import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  CalendarDays,
  BookOpen,
  X,
} from "lucide-react";

const initialExams = [
  {
    id: 1,
    examName: "Mid Term Examination",
    subject: "Mathematics",
    class: "10",
    section: "A",
    date: "2026-10-15",
    startTime: "09:00",
    duration: "2 Hours",
    room: "Room 101",
    totalMarks: 100,
    status: "Upcoming",
  },
  {
    id: 2,
    examName: "Mid Term Examination",
    subject: "Science",
    class: "10",
    section: "A",
    date: "2026-10-16",
    startTime: "09:00",
    duration: "2 Hours",
    room: "Room 102",
    totalMarks: 100,
    status: "Upcoming",
  },
  {
    id: 3,
    examName: "Unit Test 2",
    subject: "English",
    class: "9",
    section: "B",
    date: "2026-10-10",
    startTime: "10:00",
    duration: "1 Hour",
    room: "Room 205",
    totalMarks: 50,
    status: "Upcoming",
  },
  {
    id: 4,
    examName: "Semester Final",
    subject: "History",
    class: "8",
    section: "A",
    date: "2026-09-20",
    startTime: "09:00",
    duration: "3 Hours",
    room: "Hall A",
    totalMarks: 100,
    status: "Completed",
  },
  {
    id: 5,
    examName: "Practical Exam",
    subject: "Computer Science",
    class: "10",
    section: "B",
    date: "2026-10-18",
    startTime: "11:00",
    duration: "2 Hours",
    room: "Lab 1",
    totalMarks: 50,
    status: "Upcoming",
  },
];

function Examinations() {
  const [examinations, setExaminations] = useState(initialExams);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [selectedExam, setSelectedExam] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newExam, setNewExam] = useState({
    examName: "",
    subject: "",
    class: "10",
    section: "A",
    date: "",
    startTime: "09:00",
    duration: "2 Hours",
    room: "",
    totalMarks: 100,
  });

  const filteredExaminations = examinations.filter((exam) => {
    const searchText = search.toLowerCase();
    const matchesSearch =
      exam.examName.toLowerCase().includes(searchText) ||
      exam.subject.toLowerCase().includes(searchText);
    const matchesClass = classFilter === "All" || exam.class === classFilter;
    return matchesSearch && matchesClass;
  });

  const upcomingCount = examinations.filter((e) => e.status === "Upcoming").length;
  const completedCount = examinations.filter((e) => e.status === "Completed").length;
  const subjectsCount = new Set(examinations.map((e) => e.subject)).size;

  const updateField = (field, value) => {
    setNewExam({ ...newExam, [field]: value });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this examination?")) {
      setExaminations(examinations.filter((exam) => exam.id !== id));
    }
  };

  const handleAddExam = (e) => {
    e.preventDefault();

    const nextId = Math.max(...examinations.map((e) => e.id), 0) + 1;

    const newExamData = {
      id: nextId,
      examName: newExam.examName,
      subject: newExam.subject,
      class: newExam.class,
      section: newExam.section,
      date: newExam.date,
      startTime: newExam.startTime,
      duration: newExam.duration,
      room: newExam.room,
      totalMarks: Number(newExam.totalMarks),
      status: "Upcoming",
    };

    setExaminations([...examinations, newExamData]);
    setNewExam({
      examName: "",
      subject: "",
      class: "10",
      section: "A",
      date: "",
      startTime: "09:00",
      duration: "2 Hours",
      room: "",
      totalMarks: 100,
    });
    setShowAddForm(false);
  };

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>Examinations</h2>
          <p>Schedule and manage school examinations.</p>
        </div>
        <button className="primary-button" onClick={() => setShowAddForm(true)}>
          <Plus size={18} />
          Add Examination
        </button>
      </div>

      <div className="student-stats">
        <div className="student-stat-card">
          <div className="student-stat-icon blue">
            <CalendarDays size={20} />
          </div>
          <div>
            <span>Total Exams</span>
            <strong>{examinations.length}</strong>
          </div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon orange">
            <CalendarDays size={20} />
          </div>
          <div>
            <span>Upcoming</span>
            <strong>{upcomingCount}</strong>
          </div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon green">
            <BookOpen size={20} />
          </div>
          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon purple">
            <BookOpen size={20} />
          </div>
          <div>
            <span>Subjects</span>
            <strong>{subjectsCount}</strong>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="student-toolbar">
          <div className="student-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search exam or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <option value="All">All Classes</option>
            <option value="10">Class 10</option>
            <option value="9">Class 9</option>
            <option value="8">Class 8</option>
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Examination</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Date</th>
                <th>Time</th>
                <th>Room</th>
                <th>Marks</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExaminations.map((exam) => (
                <tr key={exam.id}>
                  <td>
                    <div className="exam-name-cell">
                      <div className="exam-icon">
                        <BookOpen size={16} />
                      </div>
                      <div>
                        <strong>{exam.examName}</strong>
                        <span>{exam.duration}</span>
                      </div>
                    </div>
                  </td>
                  <td>{exam.subject}</td>
                  <td>
                    Class {exam.class} - {exam.section}
                  </td>
                  <td>{exam.date}</td>
                  <td>{exam.startTime}</td>
                  <td>{exam.room}</td>
                  <td>{exam.totalMarks}</td>
                  <td>
                    <span
                      className={`exam-status ${
                        exam.status === "Upcoming"
                          ? "exam-upcoming"
                          : "exam-completed"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => setSelectedExam(exam)}>
                        <Eye size={16} />
                      </button>
                      <button>
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(exam.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredExaminations.length === 0 && (
            <div className="empty-students">
              <BookOpen size={35} />
              <h3>No examinations found</h3>
              <p>Try changing your search or class filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* VIEW MODAL */}
      {selectedExam && (
        <div className="modal-overlay">
          <div className="student-modal">
            <div className="modal-header">
              <div>
                <h3>Examination Details</h3>
                <p>{selectedExam.examName}</p>
              </div>
              <button onClick={() => setSelectedExam(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="student-profile">
              <div className="large-student-avatar">
                <BookOpen size={25} />
              </div>
              <h2>{selectedExam.subject}</h2>
              <span>
                Class {selectedExam.class} - {selectedExam.section}
              </span>
            </div>

            <div className="student-details-grid">
              <div>
                <label>Examination</label>
                <strong>{selectedExam.examName}</strong>
              </div>
              <div>
                <label>Subject</label>
                <strong>{selectedExam.subject}</strong>
              </div>
              <div>
                <label>Date</label>
                <strong>{selectedExam.date}</strong>
              </div>
              <div>
                <label>Start Time</label>
                <strong>{selectedExam.startTime}</strong>
              </div>
              <div>
                <label>Duration</label>
                <strong>{selectedExam.duration}</strong>
              </div>
              <div>
                <label>Room</label>
                <strong>{selectedExam.room}</strong>
              </div>
              <div>
                <label>Total Marks</label>
                <strong>{selectedExam.totalMarks}</strong>
              </div>
              <div>
                <label>Status</label>
                <span
                  className={`exam-status ${
                    selectedExam.status === "Upcoming"
                      ? "exam-upcoming"
                      : "exam-completed"
                  }`}
                >
                  {selectedExam.status}
                </span>
              </div>
            </div>

            <button
              className="secondary-button modal-close"
              onClick={() => setSelectedExam(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ADD EXAM MODAL */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="student-modal add-student-modal">
            <div className="modal-header">
              <div>
                <h3>Add Examination</h3>
                <p>Schedule a new examination.</p>
              </div>
              <button onClick={() => setShowAddForm(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddExam}>
              <div className="add-student-grid">
                <div className="modal-field full">
                  <label>Examination Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Mid Term Examination"
                    value={newExam.examName}
                    onChange={(e) => updateField("examName", e.target.value)}
                    required
                  />
                </div>

                <div className="modal-field">
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Mathematics"
                    value={newExam.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    required
                  />
                </div>

                <div className="modal-field">
                  <label>Class</label>
                  <select
                    value={newExam.class}
                    onChange={(e) => updateField("class", e.target.value)}
                  >
                    <option>10</option>
                    <option>9</option>
                    <option>8</option>
                    <option>7</option>
                    <option>6</option>
                  </select>
                </div>

                <div className="modal-field">
                  <label>Section</label>
                  <select
                    value={newExam.section}
                    onChange={(e) => updateField("section", e.target.value)}
                  >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>

                <div className="modal-field">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newExam.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    required
                  />
                </div>

                <div className="modal-field">
                  <label>Start Time</label>
                  <input
                    type="time"
                    value={newExam.startTime}
                    onChange={(e) => updateField("startTime", e.target.value)}
                    required
                  />
                </div>

                <div className="modal-field">
                  <label>Duration</label>
                  <select
                    value={newExam.duration}
                    onChange={(e) => updateField("duration", e.target.value)}
                  >
                    <option>1 Hour</option>
                    <option>2 Hours</option>
                    <option>3 Hours</option>
                  </select>
                </div>

                <div className="modal-field">
                  <label>Room</label>
                  <input
                    type="text"
                    placeholder="e.g. Room 204"
                    value={newExam.room}
                    onChange={(e) => updateField("room", e.target.value)}
                    required
                  />
                </div>

                <div className="modal-field">
                  <label>Total Marks</label>
                  <input
                    type="number"
                    min="1"
                    value={newExam.totalMarks}
                    onChange={(e) => updateField("totalMarks", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  <Plus size={17} />
                  Add Examination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Examinations;