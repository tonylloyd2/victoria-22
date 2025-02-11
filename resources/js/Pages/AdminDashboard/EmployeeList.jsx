import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditEmployee from './EditEmployee';  // Import the EditEmployee component

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    axios.get('/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employees!', error);
      });
  }, []);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);  // Set the employee to be edited
  };

  const handleUpdate = () => {
    // Refresh the employee list after an update
    axios.get('/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the updated employees!', error);
      });

    setSelectedEmployee(null);  // Close the edit form after update
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/employees/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));  // Remove the employee from the list
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Employee List</h2>
      {selectedEmployee ? (
        // Display the EditEmployee form when a selected employee is being edited
        <EditEmployee employee={selectedEmployee} onUpdate={handleUpdate} onDelete={handleDelete} />
      ) : (
        <ul>
          {employees.map(employee => (
            <li key={employee.id} className="p-2 border-b flex justify-between items-center">
              <div>
                {employee.name} - {employee.email} - {employee.factory} - {employee.is_active ? 'Active' : 'Inactive'} - ${employee.daily_wage}
              </div>
              <div>
                <button
                  onClick={() => handleEdit(employee)}
                  className="px-2 py-1 text-white bg-blue-500 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="px-2 py-1 text-white bg-red-500 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
