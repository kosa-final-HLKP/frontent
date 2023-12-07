"use client";
import { Button, Checkbox, TextInput, Label } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signin } from "@/services/auth";
import { LoginFormType } from "@/types";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    signin(data).then(() => {
      router.push("/");
    });
  };
  return (
    <form
      className="w-96 flex flex-col gap-4 max-w-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="이메일" />
        </div>
        <TextInput
          {...register("email", { required: true })}
          type="email"
          required
        />
        {errors.email && <div>이메일을 입력해주세요</div>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="비밀번호" />
        </div>
        <TextInput
          {...register("password", { required: true })}
          type="password"
          required
        />
        {errors.password && <div>비밀번호를 입력해주세요</div>}
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">아이디 저장</Label>
      </div>
      <Button className="bg-[#FDBD02] focus:bg-[#fda502]" type="submit">
        로그인
      </Button>
    </form>
  );
}
