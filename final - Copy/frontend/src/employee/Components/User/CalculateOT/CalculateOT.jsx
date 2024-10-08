
import React, { useState, useEffect } from "react";
import axios from "axios";
import './CalculateOT.css'

const OvertimeCalculator = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [hours, setHours] = useState("");
  const [rate, setRate] = useState("");
  const [salary, setSalary] = useState(0);
  const [overtimeAmount, setOvertimeAmount] = useState(0); // New state for overtime amount

  useEffect(() => {
    // Fetch employees with role "employee"
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        const employeesList = response.data.users.filter(user => user.role === 'employee');
        setEmployees(employeesList);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeChange = (event) => {
    const employeeId = event.target.value;
    const employee = employees.find(emp => emp._id === employeeId);
    setSelectedEmployee(employee);
    setSalary(employee ? employee.salary : 0);
    setOvertimeAmount(0); // Reset overtime amount when employee changes
  };

  const handleHoursChange = (event) => setHours(event.target.value);
  const handleRateChange = (event) => setRate(event.target.value);

  const calculateOvertime = () => {
    const hoursNumber = parseFloat(hours);
    const ratePercentage = parseFloat(rate);

    if (!hoursNumber || isNaN(ratePercentage) || ratePercentage < 0 || ratePercentage > 100) {
      alert("Please enter valid hours and rate percentage (0-100).");
      return;
    }

    const rateDecimal = ratePercentage / 100; // Convert percentage to decimal
    const overtime = salary * hoursNumber * rateDecimal; // Calculate overtime payment
    setOvertimeAmount(overtime); // Update state with calculated overtime
    alert(`Overtime Payment Amount: $${overtime.toFixed(2)}`);
  };

  const totalSalaryWithOT = salary + overtimeAmount; // Calculate total salary + overtime

  const saveTotalSalaryWithOT = async () => {
    if (!selectedEmployee) {
        alert("Please select an employee first.");
        return;
    }

    try {
        // Send PUT request to update employee's total salary with overtime
        const response = await axios.put(`http://localhost:5000/users/${selectedEmployee._id}`, {
            total_salary_with_OT: totalSalaryWithOT, // Include total_salary_with_OT in the request
            
        });

        alert("Total salary with overtime has been successfully updated!");
    } catch (error) {
        console.error("Error updating total salary with overtime:", error);
        alert("Error updating total salary. Please try again.");
    }
};


  return (
    <div className="overtime-calculator">
      <h1>Overtime Payment Calculator</h1>

      <div>
        <label htmlFor="employee">Select Employee:</label>
        <select id="employee" onChange={handleEmployeeChange}>
          <option value="">--Select an Employee--</option>
          {employees.map(employee => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      {selectedEmployee && (
        <div>
          <p><strong>Selected Employee Salary:</strong> ${salary}</p>

          <div>
            <label htmlFor="hours">Overtime Hours:</label>
            <input
              id="hours"
              type="number"
              value={hours}
              onChange={handleHoursChange}
            />
          </div>

          <div>
            <label htmlFor="rate">Overtime Rate (% of salary):</label>
            <input
              id="rate"
              type="number"
              value={rate}
              onChange={handleRateChange}
              min="0"
              max="100"
            />
          </div>

          <button onClick={calculateOvertime}>Calculate Overtime</button>

          {/* Display the total salary + overtime */}
          <h2>Total salary including overtime: ${totalSalaryWithOT.toFixed(2)}</h2>

          {/* Save total salary with OT to the database */}
          <button onClick={saveTotalSalaryWithOT}>Save Total Salary with Overtime</button>
        </div>
      )}
    </div>
  );
};

export default OvertimeCalculator;


