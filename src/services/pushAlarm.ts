import fs from "fs/promises";
import { NextResponse } from "next/server";
import { axios } from "@/utils/axios";

export async function pushAlarm(content: string) {
  try {
    const token = await getFcmToken();
    if (token) {
      return axios.post(
        "https://fcm.googleapis.com/fcm/send",
        {
          to: token,
          notification: {
            body: content,
            title: "BeBeFace에서 알림이 도착했습니다.",
          },
        },
        {
          headers: {
            Authorization:
              "key=AAAAANVh6Cc:APA91bGmXsYiCNSKedtF_5TJhNcLTXZKi9ifM5XQ9dgft15zWP6bE10U9QslW6wNYxmsXS_4VVBrNgsGvg7teyRAR3xRVNhp3ZrdUGz72ofuL_hRv9gBDbeOdOEWsnBzJmOODGZRoHU9",
          },
        }
      );
    } else throw new Error(token);
  } catch (e) {
    NextResponse.json(e, { status: 500 });
  }
}

export async function getFcmToken() {
  const token = await fs.readFile("src/assets/token.txt", "utf8");
  if (token) return Promise.resolve(token.trim());
  else return Promise.reject(new Error("fcm 토큰이 존재하지 않습니다."));
}
