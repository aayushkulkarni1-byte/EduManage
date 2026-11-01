import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Bell,
  CalendarDays,
  X
} from "lucide-react";

import noticesData from "../data/notices.json";

function Notices() {
  const [notices, setNotices] = useState(noticesData);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newNotice, setNewNotice] = useState({
    title: "",
    category: "General",
    description: "",
    date: "",
    priority: "Normal",
    postedBy: "Admin"
  });

  const categories = [
    "All",
    ...new Set(notices.map((notice) => notice.category))
  ];

  const filteredNotices = notices.filter((notice) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      notice.title.toLowerCase().includes(searchText) ||
      notice.description.toLowerCase().includes(searchText);

    const matchesCategory =
      categoryFilter === "All" ||
      notice.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const importantCount = notices.filter(
    (notice) =>
      notice.priority === "High" ||
      notice.priority === "Important"
  ).length;

  const recentCount = notices.filter(
    (notice) => notice.status === "Published"
  ).length;

  const updateField = (field, value) => {
    setNewNotice({
      ...newNotice,
      [field]: value
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmed) {
      return;
    }

    setNotices(
      notices.filter((notice) => notice.id !== id)
    );
  };

  const handleAddNotice = (e) => {
    e.preventDefault();

    const nextId =
      Math.max(...notices.map((notice) => notice.id)) + 1;

    const newNoticeData = {
      id: nextId,
      title: newNotice.title,
      category: newNotice.category,
      description: newNotice.description,
      date: newNotice.date,
      priority: newNotice.priority,
      postedBy: newNotice.postedBy,
      status: "Published"
    };

    setNotices([
      newNoticeData,
      ...notices
    ]);

    setNewNotice({
      title: "",
      category: "General",
      description: "",
      date: "",
      priority: "Normal",
      postedBy: "Admin"
    });

    setShowAddForm(false);
  };

  const getPriorityClass = (priority) => {
    if (
      priority === "High" ||
      priority === "Important"
    ) {
      return "notice-high";
    }

    if (priority === "Medium") {
      return "notice-medium";
    }

    return "notice-normal";
  };

  return (
    <main className="page">

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h2>Notices & Announcements</h2>

          <p>
            Create and manage important school announcements.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={18} />
          Create Notice
        </button>

      </div>


      {/* STAT CARDS */}

      <div className="student-stats">

        <div className="student-stat-card">

          <div className="student-stat-icon blue">
            <Bell size={20} />
          </div>

          <div>
            <span>Total Notices</span>

            <strong>
              {notices.length}
            </strong>
          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon green">
            <Bell size={20} />
          </div>

          <div>
            <span>Published</span>

            <strong>
              {recentCount}
            </strong>
          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon orange">
            <Bell size={20} />
          </div>

          <div>
            <span>Important</span>

            <strong>
              {importantCount}
            </strong>
          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon purple">
            <CalendarDays size={20} />
          </div>

          <div>
            <span>Categories</span>

            <strong>
              {categories.length - 1}
            </strong>
          </div>

        </div>

      </div>


      {/* CONTENT */}

      <div className="content-card">

        {/* TOOLBAR */}

        <div className="student-toolbar">

          <div className="student-search">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search notices..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category === "All"
                  ? "All Categories"
                  : category}
              </option>
            ))}

          </select>

        </div>


        {/* NOTICE LIST */}

        <div className="notice-list">

          {filteredNotices.map((notice) => (

            <div
              className="notice-card"
              key={notice.id}
            >

              <div className="notice-icon">

                <Bell size={19} />

              </div>


              <div className="notice-content">

                <div className="notice-title-row">

                  <h3>
                    {notice.title}
                  </h3>

                  <span
                    className={`notice-priority ${getPriorityClass(
                      notice.priority
                    )}`}
                  >
                    {notice.priority}
                  </span>

                </div>


                <p>
                  {notice.description}
                </p>


                <div className="notice-meta">

                  <span>
                    <CalendarDays size={13} />
                    {notice.date}
                  </span>

                  <span>
                    Posted by {notice.postedBy}
                  </span>

                  <span className="notice-category">
                    {notice.category}
                  </span>

                </div>

              </div>


              <div className="action-buttons">

                <button
                  title="View"
                  onClick={() =>
                    setSelectedNotice(notice)
                  }
                >
                  <Eye size={16} />
                </button>


                <button
                  title="Edit"
                  onClick={() =>
                    alert(
                      "Edit functionality will be connected to the Kotlin backend later."
                    )
                  }
                >
                  <Pencil size={16} />
                </button>


                <button
                  title="Delete"
                  onClick={() =>
                    handleDelete(notice.id)
                  }
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>

          ))}


          {filteredNotices.length === 0 && (

            <div className="empty-students">

              <Bell size={35} />

              <h3>
                No notices found
              </h3>

              <p>
                Try changing your search or category filter.
              </p>

            </div>

          )}

        </div>

      </div>


      {/* VIEW NOTICE MODAL */}

      {selectedNotice && (

        <div className="modal-overlay">

          <div className="student-modal">

            <div className="modal-header">

              <div>

                <h3>
                  Notice Details
                </h3>

                <p>
                  {selectedNotice.category}
                </p>

              </div>


              <button
                onClick={() =>
                  setSelectedNotice(null)
                }
              >
                <X size={20} />
              </button>

            </div>


            <div className="notice-modal-icon">

              <Bell size={25} />

            </div>


            <div className="notice-modal-content">

              <h2>
                {selectedNotice.title}
              </h2>

              <div className="notice-modal-meta">

                <span>
                  {selectedNotice.date}
                </span>

                <span>
                  {selectedNotice.category}
                </span>

                <span
                  className={`notice-priority ${getPriorityClass(
                    selectedNotice.priority
                  )}`}
                >
                  {selectedNotice.priority}
                </span>

              </div>


              <p>
                {selectedNotice.description}
              </p>


              <div className="notice-posted-by">

                Posted by{" "}
                <strong>
                  {selectedNotice.postedBy}
                </strong>

              </div>

            </div>


            <button
              className="secondary-button modal-close"
              onClick={() =>
                setSelectedNotice(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* ADD NOTICE MODAL */}

      {showAddForm && (

        <div className="modal-overlay">

          <div className="student-modal add-student-modal">

            <div className="modal-header">

              <div>

                <h3>
                  Create Notice
                </h3>

                <p>
                  Publish a new school announcement.
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


            <form onSubmit={handleAddNotice}>

              <div className="add-student-grid">

                <div className="modal-field full">

                  <label>
                    Notice Title
                  </label>

                  <input
                    type="text"
                    placeholder="Enter notice title"
                    value={newNotice.title}
                    onChange={(e) =>
                      updateField(
                        "title",
                        e.target.value
                      )
                    }
                    required
                  />

                </div>


                <div className="modal-field">

                  <label>
                    Category
                  </label>

                  <select
                    value={newNotice.category}
                    onChange={(e) =>
                      updateField(
                        "category",
                        e.target.value
                      )
                    }
                  >

                    <option>
                      General
                    </option>

                    <option>
                      Academic
                    </option>

                    <option>
                      Examination
                    </option>

                    <option>
                      Event
                    </option>

                    <option>
                      Holiday
                    </option>

                    <option>
                      Sports
                    </option>

                  </select>

                </div>


                <div className="modal-field">

                  <label>
                    Priority
                  </label>

                  <select
                    value={newNotice.priority}
                    onChange={(e) =>
                      updateField(
                        "priority",
                        e.target.value
                      )
                    }
                  >

                    <option>
                      Normal
                    </option>

                    <option>
                      Medium
                    </option>

                    <option>
                      High
                    </option>

                    <option>
                      Important
                    </option>

                  </select>

                </div>


                <div className="modal-field">

                  <label>
                    Date
                  </label>

                  <input
                    type="date"
                    value={newNotice.date}
                    onChange={(e) =>
                      updateField(
                        "date",
                        e.target.value
                      )
                    }
                    required
                  />

                </div>


                <div className="modal-field">

                  <label>
                    Posted By
                  </label>

                  <input
                    type="text"
                    value={newNotice.postedBy}
                    onChange={(e) =>
                      updateField(
                        "postedBy",
                        e.target.value
                      )
                    }
                    required
                  />

                </div>


                <div className="modal-field full">

                  <label>
                    Description
                  </label>

                  <textarea
                    placeholder="Write the announcement..."
                    value={newNotice.description}
                    onChange={(e) =>
                      updateField(
                        "description",
                        e.target.value
                      )
                    }
                    rows="5"
                    required
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

                  Publish Notice

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}

export default Notices;