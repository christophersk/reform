import React from 'react';
import { NavLink } from 'react-router-dom';

export default function FormEntry (form) {
  return (
    <div className="row">
      <div className="col-4">
        {form.name}
      </div>
      <div className="col-2">
        <NavLink to={`/forms/edit/${form.id}`} >Edit</NavLink>
      </div>
    </div>
  );
}
