"use client";

import React, { useCallback, useRef } from "react";

export default function TestTestTest() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      const formdata = new FormData();
      formdata.append("image", e.target.files[0], "[PROXY]");

      const reader = new FileReader();

      reader.onload = function (event) {
        setMainImg(event.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);

      fetch("http://localhost:8080/image", {
        method: "POST", // *GET, POST, PUT, DELETE 등
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: { "Content-Type": "multipart/form-data" },
        body: formdata,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
    []
  );

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onUploadImage}
      />
      <button onClick={onUploadImageButtonClick}>버튼</button>
    </>
  );
}
