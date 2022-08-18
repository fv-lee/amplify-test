import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import React from "react";
import axios from "axios";

const Home: NextPage = () => {
  const handleBtn = async () => {
    const res = await axios("/api/writeXLSX", {
      method: "GET",
    });
    console.log(res);
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios("/api/uploadURL", {
      method: "POST",
      data: { fileName: "data" },
    });
    const { uploadURL } = res.data;
    const s3Res = await axios(uploadURL, {
      method: "PUT",
      data: formData,
    });
    console.log(s3Res);
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
