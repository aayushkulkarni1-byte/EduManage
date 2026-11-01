import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  CreditCard,
  IndianRupee,
  CheckCircle,
  Clock,
  AlertCircle,
  X
} from "lucide-react";

import feesData from "../data/fees.json";

function Fees() {
  const [fees, setFees] = useState(feesData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedFee, setSelectedFee] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [paymentAmount, setPaymentAmount] = useState("");

  const filteredFees = fees.filter((fee) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      fee.studentName.toLowerCase().includes(searchText) ||
      fee.studentId.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      fee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalFees = fees.reduce(
    (total, fee) => total + Number(fee.totalAmount),
    0
  );

  const totalPaid = fees.reduce(
    (total, fee) => total + Number(fee.paidAmount),
    0
  );

  const totalPending = totalFees - totalPaid;

  const paidCount = fees.filter(
    (fee) => fee.status === "Paid"
  ).length;

  const pendingCount = fees.filter(
    (fee) => fee.status === "Pending"
  ).length;

  const formatCurrency = (amount) => {
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  };

  const getStatusClass = (status) => {
    if (status === "Paid") {
      return "fee-paid";
    }

    if (status === "Partial") {
      return "fee-partial";
    }

    return "fee-pending";
  };

  const handlePayment = (e) => {
    e.preventDefault();

    const amount = Number(paymentAmount);

    if (!amount || amount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    setFees(
      fees.map((fee) => {
        if (fee.id !== selectedFee.id) {
          return fee;
        }

        const newPaidAmount =
          Number(fee.paidAmount) + amount;

        let newStatus = "Partial";

        if (newPaidAmount >= Number(fee.totalAmount)) {
          newStatus = "Paid";
        }

        return {
          ...fee,
          paidAmount: Math.min(
            newPaidAmount,
            Number(fee.totalAmount)
          ),
          status: newStatus,
          lastPaymentDate: "2026-10-03"
        };
      })
    );

    setPaymentAmount("");
    setShowPaymentForm(false);
    setSelectedFee(null);
  };

  return (
    <main className="page">

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h2>Fees & Payments</h2>

          <p>
            Manage student fees, payments and outstanding balances.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowPaymentForm(true)}
        >
          <Plus size={18} />
          Record Payment
        </button>

      </div>


      {/* STAT CARDS */}

      <div className="student-stats">

        <div className="student-stat-card">

          <div className="student-stat-icon blue">
            <IndianRupee size={20} />
          </div>

          <div>
            <span>Total Fees</span>

            <strong>
              {formatCurrency(totalFees)}
            </strong>
          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon green">
            <CheckCircle size={20} />
          </div>

          <div>
            <span>Total Paid</span>

            <strong>
              {formatCurrency(totalPaid)}
            </strong>
          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon orange">
            <Clock size={20} />
          </div>

          <div>
            <span>Pending Amount</span>

            <strong>
              {formatCurrency(totalPending)}
            </strong>
          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon purple">
            <AlertCircle size={20} />
          </div>

          <div>
            <span>Pending Students</span>

            <strong>
              {pendingCount}
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
              placeholder="Search student or ID..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="All">
              All Payments
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Partial">
              Partial
            </option>

            <option value="Pending">
              Pending
            </option>

          </select>

        </div>


        {/* TABLE */}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>Student</th>
                <th>Class</th>
                <th>Fee Type</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {filteredFees.map((fee) => {

                const balance =
                  Number(fee.totalAmount) -
                  Number(fee.paidAmount);

                return (
                  <tr key={fee.id}>

                    <td>

                      <div className="student-name-cell">

                        <div className="student-avatar">
                          {fee.studentName
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <strong>
                            {fee.studentName}
                          </strong>

                          <span>
                            {fee.studentId}
                          </span>

                        </div>

                      </div>

                    </td>


                    <td>
                      Class {fee.class} - {fee.section}
                    </td>


                    <td>
                      {fee.feeType}
                    </td>


                    <td>
                      {formatCurrency(fee.totalAmount)}
                    </td>


                    <td className="paid-amount">
                      {formatCurrency(fee.paidAmount)}
                    </td>


                    <td className="pending-amount">
                      {formatCurrency(balance)}
                    </td>


                    <td>

                      <span
                        className={`fee-status ${getStatusClass(
                          fee.status
                        )}`}
                      >
                        {fee.status}
                      </span>

                    </td>


                    <td>

                      <div className="action-buttons">

                        <button
                          title="View"
                          onClick={() =>
                            setSelectedFee(fee)
                          }
                        >
                          <Eye size={16} />
                        </button>

                        {fee.status !== "Paid" && (
                          <button
                            title="Make Payment"
                            onClick={() => {
                              setSelectedFee(fee);
                              setShowPaymentForm(true);
                            }}
                          >
                            <CreditCard size={16} />
                          </button>
                        )}

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>


          {filteredFees.length === 0 && (

            <div className="empty-students">

              <IndianRupee size={35} />

              <h3>
                No fee records found
              </h3>

              <p>
                Try changing your search or payment filter.
              </p>

            </div>

          )}

        </div>

      </div>


      {/* FEE DETAILS MODAL */}

      {selectedFee && !showPaymentForm && (

        <div className="modal-overlay">

          <div className="student-modal">

            <div className="modal-header">

              <div>

                <h3>
                  Fee Details
                </h3>

                <p>
                  {selectedFee.studentId}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedFee(null)
                }
              >
                <X size={20} />
              </button>

            </div>


            <div className="student-profile">

              <div className="large-student-avatar">

                {selectedFee.studentName
                  .charAt(0)
                  .toUpperCase()}

              </div>

              <h2>
                {selectedFee.studentName}
              </h2>

              <span>
                Class {selectedFee.class} -{" "}
                {selectedFee.section}
              </span>

            </div>


            <div className="student-details-grid">

              <div>
                <label>Fee Type</label>
                <strong>
                  {selectedFee.feeType}
                </strong>
              </div>


              <div>
                <label>Academic Year</label>
                <strong>
                  {selectedFee.academicYear}
                </strong>
              </div>


              <div>
                <label>Total Amount</label>
                <strong>
                  {formatCurrency(
                    selectedFee.totalAmount
                  )}
                </strong>
              </div>


              <div>
                <label>Paid Amount</label>
                <strong>
                  {formatCurrency(
                    selectedFee.paidAmount
                  )}
                </strong>
              </div>


              <div>
                <label>Balance</label>
                <strong>
                  {formatCurrency(
                    Number(selectedFee.totalAmount) -
                    Number(selectedFee.paidAmount)
                  )}
                </strong>
              </div>


              <div>
                <label>Status</label>

                <span
                  className={`fee-status ${getStatusClass(
                    selectedFee.status
                  )}`}
                >
                  {selectedFee.status}
                </span>

              </div>


              <div>
                <label>Due Date</label>
                <strong>
                  {selectedFee.dueDate}
                </strong>
              </div>


              <div>
                <label>Last Payment</label>
                <strong>
                  {selectedFee.lastPaymentDate || "No payment yet"}
                </strong>
              </div>

            </div>


            <button
              className="secondary-button modal-close"
              onClick={() =>
                setSelectedFee(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* PAYMENT MODAL */}

      {showPaymentForm && (

        <div className="modal-overlay">

          <div className="student-modal">

            <div className="modal-header">

              <div>

                <h3>
                  Record Payment
                </h3>

                <p>
                  Enter payment information.
                </p>

              </div>

              <button
                onClick={() => {
                  setShowPaymentForm(false);
                  setSelectedFee(null);
                }}
              >
                <X size={20} />
              </button>

            </div>


            {!selectedFee ? (

              <div className="payment-selection">

                <label>
                  Select Student
                </label>

                <select
                  onChange={(e) => {

                    const fee = fees.find(
                      (item) =>
                        item.id ===
                        Number(e.target.value)
                    );

                    setSelectedFee(fee);
                  }}
                  defaultValue=""
                >

                  <option value="" disabled>
                    Select student
                  </option>

                  {fees
                    .filter(
                      (fee) =>
                        fee.status !== "Paid"
                    )
                    .map((fee) => (

                      <option
                        key={fee.id}
                        value={fee.id}
                      >
                        {fee.studentName} -{" "}
                        {fee.studentId}
                      </option>

                    ))}

                </select>

              </div>

            ) : (

              <form onSubmit={handlePayment}>

                <div className="payment-student-box">

                  <div className="student-avatar">

                    {selectedFee.studentName
                      .charAt(0)
                      .toUpperCase()}

                  </div>

                  <div>

                    <strong>
                      {selectedFee.studentName}
                    </strong>

                    <span>
                      {selectedFee.studentId}
                    </span>

                  </div>

                </div>


                <div className="payment-summary">

                  <div>
                    <span>Total Fee</span>

                    <strong>
                      {formatCurrency(
                        selectedFee.totalAmount
                      )}
                    </strong>
                  </div>


                  <div>
                    <span>Already Paid</span>

                    <strong>
                      {formatCurrency(
                        selectedFee.paidAmount
                      )}
                    </strong>
                  </div>


                  <div>
                    <span>Remaining</span>

                    <strong>
                      {formatCurrency(
                        Number(
                          selectedFee.totalAmount
                        ) -
                        Number(
                          selectedFee.paidAmount
                        )
                      )}
                    </strong>
                  </div>

                </div>


                <div className="modal-field">

                  <label>
                    Payment Amount
                  </label>

                  <input
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    value={paymentAmount}
                    onChange={(e) =>
                      setPaymentAmount(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>


                <div className="modal-actions">

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      setShowPaymentForm(false);
                      setSelectedFee(null);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-button"
                  >
                    <CreditCard size={17} />
                    Record Payment
                  </button>

                </div>

              </form>

            )}

          </div>

        </div>

      )}

    </main>
  );
}

export default Fees;