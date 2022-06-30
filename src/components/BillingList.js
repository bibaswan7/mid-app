import React, { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";
import { formatter } from "../utils";
import ReactSelect from "react-select";

const BillingList = ({ batch, faculty, college, expenses, listedProducts }) => {
  const [entries, setEntries] = useState(expenses || []);

  const [product, setProduct] = useState({});
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const productRef = useRef(null);
  const qtyRef = useRef(null);
  const priceRef = useRef(null);

  const handlePressEnterAtName = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      priceRef.current.focus();
    }
  };

  const handlePressEnterAtQuantity = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      productRef.current.focus();
      handleAddEntry();
    }
  };

  const handlePressEnterAtPrice = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      qtyRef.current.focus();
    }
  };

  const handleAddEntry = () => {
    if (!editMode) {
      setEntries([
        ...entries,
        {
          id: entries.length + 1,
          product: product.id,
          quantity: quantity,
          price: price,
        },
      ]);
    } else {
      setEntries(
        entries.map((en) =>
          en.id === selectedEntry.id ? { ...en, product, quantity, price } : en
        )
      );
      setEditMode(false);
      setSelectedEntry(null);
    }
    setProduct("");
    setQuantity(1);
    setPrice("");
    productRef.current.focus();
  };

  const handleRemoveEntry = (id) => {
    setEntries(entries.filter((a) => a.id !== id));
  };

  const handleEditEntry = (entry) => {
    setEditMode(true);
    setSelectedEntry(entry);
    setProduct(entry.product);
    setQuantity(entry.quantity);
    setPrice(entry.price);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedEntry(null);
    setProduct("");
    setQuantity(1);
    setPrice("");
    productRef.current.focus();
  };

  return (
    <div>
      <h1>Billing List</h1>
      <ul>
        {entries.map((s) => (
          <li
            key={s.id}
            className={selectedEntry?.id === s.id ? "selected-entry" : ""}
          >
            <span>{s.id} </span>
            <span>{s.product}</span>
            <span> {s.quantity} available </span>
            <span>{formatter.format(s.price)}</span>
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
        <li>
          <span>Total - </span>
          <span>
            {formatter.format(entries.reduce((a, v) => a + +v.price, 0))}
          </span>
        </li>
      </ul>
      <button onClick={() => setEntries([])}>Clear All</button>

      <select
        placeholder="Enter product"
        onChange={(e) => setProduct(e.target.value)}
        value={product}
        ref={productRef}
        onKeyUp={handlePressEnterAtName}
      >
        <option value={1}>LCD TV</option>
        <option value={2}>Smart TV</option>
        <option value={3}>Normal TV</option>
        {listedProducts.map((a) => (
          <option key={a.id} value={a.id}>
            {a.product}
          </option>
        ))}
      </select>

      <ReactSelect
        options={listedProducts.map((a) => ({
          ...a,
          value: a.id,
          label: a.product,
        }))}
        // options={listedProducts}
        onChange={(a) => setProduct(a)}
        placeholder="Select Billable Product"
      />

      <input
        placeholder="Enter Price"
        onChange={(e) => setPrice(e.target.value)}
        value={product?.price}
        type="number"
        ref={priceRef}
        disabled
        onKeyUp={handlePressEnterAtPrice}
      />
      <input
        placeholder="Enter Quantity"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        ref={qtyRef}
        type="number"
        onKeyUp={handlePressEnterAtQuantity}
      />
      <button onClick={handleAddEntry}>{editMode ? "Save" : "+Add"}</button>
      {editMode ? <button onClick={handleCancelEdit}>Cancel</button> : null}
    </div>
  );
};

export default BillingList;
