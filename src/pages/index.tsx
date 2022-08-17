import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import React from "react";

const Home: NextPage = () => {
  const handleBtn = async () => {
    const res = await fetch("/api/readData");
    console.log(res);
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.card}>
          <input onChange={handleFileChange} type="file" />
        </div>
        <div className={styles.card}>
          <button onClick={handleBtn}>버튼</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
