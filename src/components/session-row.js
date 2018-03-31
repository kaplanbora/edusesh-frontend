import React from "react";
import {Link} from "react-router-dom";

const getStatus = session => {
  if (session.isCompleted) return "Completed";
  else if (session.isApproved) return "Approved";
  else return "Not Approved";
};

const formatDate = date => {
  const d = new Date(Date.parse(date));
  return d.toLocaleString();
};

export const SessionRow = ({role, session, approveSession, removeSession}) => {
  return (
    <tr>
      <td><Link className="btn btn-link" to={"/user/" + session.instructorId}>{session.instructorId}</Link></td>
      <td>{session.topicId}</td>
      <td><Link className="btn btn-link" to={`/session/${session.id}`}>{session.name}</Link></td>
      <td>{session.description}</td>
      <td>{formatDate(session.date)}</td>
      <td>{getStatus(session)}</td>
      <td>
        <button className="btn btn-link" onClick={() => removeSession(session.id)}>
          <i className="icon icon-cross"/>
        </button>
        {role === "instructor" && !session.isApproved &&
        <button className="btn btn-link" onClick={() => approveSession(session.id)}>
          <i className="icon icon-check"/>
        </button>}
      </td>
    </tr>
  );
};