import React, { useEffect, useRef, useState } from "react";
import { getQuotes } from "../Actions/quotes";
import useGlobal from "../store";

function QuoteRow(props) {
  const { firstName, lastName, email, amount, description } = props;
  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{amount}</td>
      <td>{description}</td>
    </tr>
  );
}

export default function Quotes() {
  const [quotes, setQuotes] = useState();
  const [error, setError] = useState();
  const [globalState] = useGlobal();
  const componentIsMounted = useRef(true);
  useEffect(() => {
    getQuotes(globalState.security.accessToken).then(
      ({ data }) => {
        if (componentIsMounted.current) setQuotes(data);
      },
      (error) => {
        console.error(error);
        setError(error.response?.data.message || error.message);
      }
    );
    return () => {
      componentIsMounted.current = false;
    };
  }, [globalState.security.accessToken]);
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  if (!quotes) {
    return <div className="alert alert-info">Loading</div>;
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Amount</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {quotes.map((quote) => (
          <QuoteRow {...quote} />
        ))}
      </tbody>
    </table>
  );
}
