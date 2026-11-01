import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  GraduationCap,
  X,
} from "lucide-react";

const initialTeachers = [
  {
    id: 1,
    teacherId: "TCH001",
    name: "Priya Sharma",
    subject: "Mathematics",
    classes: "10-A, 9-B",
    phone: "+91 98765 11111",
    email: "priya.sharma@edumanage.com",
    status: "Active",
  },
  {
    id: 2,
    teacherId: "TCH002",
    name: "Rajesh Patel",
    subject: "Science",
    classes: "10-B, 8-A",
    phone: "+91 98765 22222",
    email: "rajesh.patel@edumanage.com",
    status: "Active",
  },
  {
    id: 3,
    teacherId: "TCH003",
    name: "Anjali Mehta",
    subject: "English",
    classes: "9-A, 8-B",
    phone: "+91 98765 33333",
    email: "anjali.mehta@edumanage.com",
    status: "Active",
  },
  {
    id: 4,
    teacherId: "TCH004",
    name: "Vikram Singh",
    subject: "History",
    classes: "10-A, 9-A",
    phone: "+91 98765 44444",
    email: "vikram.singh@edumanage.com",
    status: "Active",
  },
  {
    id: 5,
    teacherId: "TCH005",
    name: "Sneha Joshi",
    subject: "Computer Science",
    classes: "10-B, 9-B",
    phone: "+91 98765 55555",
    email: "sneha.joshi@edumanage.com",
    status: "Active",
  },
];

function Teachers() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [search, setSearch] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    subject: "",
    classes: "",
    phone: "",
    email: "",
  });

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.teacherId.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase())
  );

  const updateField = (field, value) => {
    setNewTeacher({ ...newTeacher, [field]: value });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();

    const nextId = Math.max(...teachers.map((t) => t.id), 0) + 1;

    const teacher = {
      id: nextId,
      teacherId: `TCH${String(nextId).padStart(3, "0")}`,
      name: newTeacher.name,
      subject: newTeacher.subject,
      classes: newTeacher.classes,
      phone: newTeacher.phone,
      email: newTeacher.email,
      status: "Active",
    };

    setTeachers([...teachers, teacher]);
    setNewTeacher({
      name: "",
      subject: "",
      classes: "",
      phone: "",
      email: "",
    });
    setShowAddForm(false);
  };

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h2>Teachers</h2>
          <p>Manage teacher profiles and assigned classes.</p>
        </div>
        <button className="primary-button" onClick={() => setShowAddForm(true)}>
          <Plus size={18} />
          Add Teacher
        </button>
      </div>

      <div className="student-stats">
        <div className="student-stat-card">
          <div className="student-stat-icon blue">
            <GraduationCap size={20} />
          </div>
          <div>
            <span>Total Teachers</span>
            <strong>{teachers.length}</strong>
          </div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon green">
            <GraduationCap size={20} />
          </div>
          <div>
            <span>Active</span>
            <strong>{teachers.filter((t) => t.status === "Active").length}</strong>
          </div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon purple">
            <GraduationCap size={20} />
          </div>
          <div>
            <span>Subjects</span>
            <strong>{new Set(teachers.map((t) => t.subject)).size}</strong>
          </div>
        </div>
        <div className="student-stat-card">
          <div className="student-stat-icon orange">
            <GraduationCap size={20} />
          </div>
          <div>
            <span>Classes Covered</span>
            <strong>8</strong>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="student-toolbar">
          <div className="student-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search teacher name, ID or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Teacher</th>
                <th>ID</th>
                <th>Subject</th>
                <th>Classes</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((teacher) => (
                <tr key={teacher.id}>
                  <td>
                    <div className="student-name-cell">
                      <div className="student-avatar">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{teacher.name}</strong>
                        <span>{teacher.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{teacher.teacherId}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.classes}</td>
                  <td>{teacher.phone}</td>
                  <td>
                    <span className="status-badge status-active">
                      {teacher.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => setSelectedTeacher(teacher)}>
                        <Eye size={16} />
                      </button>
                      <button>
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(teacher.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="empty-students">
              <GraduationCap size={35} />
              <h3>No teachers found</h3>
              <p>Try changing your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* VIEW MODAL */}
      {selectedTeacher && (
        <div className="modal-overlay">
          <div className="student-modal">
            <div className="modal-header">
              <div>
                <h3>Teacher Details</h3>
                <p>{selectedTeacher.teacherId}</p>
              </div>
              <button onClick={() => setSelectedTeacher(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="student-profile">
              <div className="large-student-avatar">
                {selectedTeacher.name.charAt(0)}
              </div>
              <h2>{selectedTeacher.name}</h2>
              <span>{selectedTeacher.subject}</span>
            </div>

            <div className="student-details-grid">
              <div>
                <label>Teacher ID</label>
                <strong>{selectedTeacher.teacherId}</strong>
              </div>
              <div>
                <label>Subject</label>
                <strong>{selectedTeacher.subject}</strong>
              </div>
              <div>
                <label>Classes</label>
                <strong>{selectedTeacher.classes}</strong>
              </div>
              <div>
                <label>Phone</label>
                <strong>{selectedTeacher.phone}</strong>
              </div>
              <div>
                <label>Email</label>
                <strong>{selectedTeacher.email}</strong>
              </div>
              <div>
                <label>Status</label>
                <span className="status-badge status-active">
                  {selectedTeacher.status}
                </span>
              </div>
            </div>

            <button
              className="secondary-button modal-close"
              onClick={() => setSelectedTeacher(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ADD TEACHER MODAL */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="student-modal add-student-modal">
            <div className="modal-header">
              <div>
                <h3>Add New Teacher</h3>
                <p>Enter teacher information below.</p>
              </div>
              <button onClick={() => setShowAddForm(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddTeacher}>
              <div className="add-student-grid">
                <div className="modal-field full">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter teacher name"
                    value={newTeacher.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    required
                  />
                </div>

                <div className="modal-field">
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Mathematics"
                    value={newTeacher.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    required
                  />
                </div>

                <div className="modal-field">
                  <label>Classes</label>
                  <input
                    type="text"
                    placeholder="e.g. 10-A, 9-B"
                    value={newTeacher.classes}
                    onChange={(e) => updateField("classes", e.target.value)}
                    required
                  />
                </div>

                <div className="modal-field">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={newTeacher.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    required
                  />
                </div>

                <div className="modal-field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="teacher@edumanage.com"
                    value={newTeacher.email}
                    onChange={(e) => updateField("email", e.target.value)}
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
                  Add Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Teachers;