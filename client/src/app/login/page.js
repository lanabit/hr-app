export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 px-[500px]">
      <label className="input input-bordered flex w-[300px] items-center gap-2">
        Email
        <input
          type="text"
          className="grow"
          placeholder="Type your email address"
        />
      </label>
      <label className="input input-bordered flex w-[300px] items-center gap-2">
        Password
        <input type="text" className="grow" placeholder="Type your password" />
      </label>
    </div>
  );
}
