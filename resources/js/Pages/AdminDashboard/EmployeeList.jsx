import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = ({ employees }) => {
    return (
        <div>
            <h3>Employee List</h3>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.name} - {employee.email}
                        <Link to={`/employees/edit/${employee.id}`}>
                            <button>Edit</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
