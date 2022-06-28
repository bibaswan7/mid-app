import React, { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";

const Register = ({ batch, faculty, college, students }) => {
  const [entries, setEntries] = useState(students||[]);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const nameRef = useRef(null);
  const dobRef = useRef(null);
  const addressRef = useRef(null);

  const handlePressEnterAtName = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      dobRef.current.focus();
    }
  };

  const handlePressEnterAtDOB = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      addressRef.current.focus();
    }
  };

  const handlePressEnterAtAddress = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      handleAddEntry();
    }
  };

  const handleAddEntry = () => {
    if (!editMode) {
      setEntries([
        ...entries,
        {
          id: entries.length + 1,
          name: name,
          dob: dob,
          address: address,
        },
      ]);
    } else {
      setEntries(
        entries.map((en) =>
          en.id === selectedEntry.id ? { ...en, name, dob, address } : en
        )
      );
      setEditMode(false);
      setSelectedEntry(null);
    }
    setName("");
    setDob("");
    setAddress("");
    nameRef.current.focus();
  };

  const handleRemoveEntry = (id) => {
    setEntries(entries.filter((a) => a.id !== id));
  };

  const handleEditEntry = (entry) => {
    setEditMode(true);
    setSelectedEntry(entry);
    setName(entry.name);
    setDob(entry.dob);
    setAddress(entry.address);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedEntry(null);
    setName("");
    setDob("");
    setAddress("");
    nameRef.current.focus();
  };

  return (
    <div>
      <h1>{college}</h1>
      <p>
        {faculty} - {batch}
      </p>
      <ul>
        {entries.map((s) => (
          <li
            key={s.id}
            className={selectedEntry?.id === s.id ? "selected-entry" : ""}
          >
            <span>{s.id} </span>
            <span>{s.name}</span>
            <span>{s.dob}</span>
            <span>{s.address}</span>
            <AiTwotoneEdit
              color="blue"
              size={15}
              onClick={() => handleEditEntry(s)}
            />
            <FaTrash
              color="red"
              size={15}
              onClick={() => handleRemoveEntry(s.id)}
            />
          </li>
        ))}
      </ul>
      <button onClick={() => setEntries([])}>Clear All</button>
      <input
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        ref={nameRef}
        onKeyUp={handlePressEnterAtName}
      />
      <input
        placeholder="Enter DOB"
        onChange={(e) => setDob(e.target.value)}
        value={dob}
        ref={dobRef}
        type="date"
        onKeyUp={handlePressEnterAtDOB}
      />
      <input
        placeholder="Enter Address"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        ref={addressRef}
        onKeyUp={handlePressEnterAtAddress}
      />
      <button onClick={handleAddEntry}>{editMode ? "Save" : "+Add"}</button>
      {editMode ? <button onClick={handleCancelEdit}>Cancel</button> : null}

      <div>
        <h3>Input types</h3>
        <input type="button" onChange={(event) => console.log(event)} />
        <input type="checkbox" onChange={(event) => console.log(event)} />
        <input type="color" onChange={(event) => console.log(event)} />
        <input type="date" onChange={(event) => console.log(event)} />
        <input type="datetime-local" onChange={(event) => console.log(event)} />
        <input type="email" onChange={(event) => console.log(event)} />
        <input type="file" onChange={(event) => console.log(event)} />
        <input type="hidden" onChange={(event) => console.log(event)} />
        <input type="image" onChange={(event) => console.log(event)} />
        <input type="month" onChange={(event) => console.log(event)} />
        <input type="number" onChange={(event) => console.log(event)} />
        <input type="password" onChange={(event) => console.log(event)} />
        <input type="radio" onChange={(event) => console.log(event)} />
        <input type="range" onChange={(event) => console.log(event)} />
        <input type="reset" onChange={(event) => console.log(event)} />
        <input type="search" onChange={(event) => console.log(event)} />
        <input type="submit" onChange={(event) => console.log(event)} />
        <input type="tel" onChange={(event) => console.log(event)} />
        <input
          type="text"
          onChange={(event) => console.log(event)}
          onKeyUp={(e) => console.log(e)}
        />
        <input type="time" onChange={(event) => console.log(event)} />
        <input type="url" onChange={(event) => console.log(event)} />
        <input type="week" onChange={(event) => console.log(event)} />
      </div>
    </div>
  );
};

export default Register;
