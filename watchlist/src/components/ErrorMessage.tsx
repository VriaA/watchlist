export default function ErrorMessage({
  message,
}: {
  message: string;
}): JSX.Element {
  return (
    <div className="flex-1 h-full flex flex-col items-center justify-center text-center gap-2">
      <p className="text-base font-semibold tracking-wide">{message}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48px"
        viewBox="0 -960 960 960"
        width="48px"
        fill="#fff"
      >
        <path d="M479.93-274.02q16.46 0 27.4-10.74 10.93-10.75 10.93-27.21t-10.86-27.52q-10.86-11.05-27.33-11.05-16.46 0-27.4 11.03-10.93 11.04-10.93 27.5 0 16.47 10.86 27.23 10.86 10.76 27.33 10.76Zm-31-158.74h68.14v-257.07h-68.14v257.07ZM480.3-74.02q-84.2 0-158.04-31.88-73.84-31.88-129.16-87.2-55.32-55.32-87.2-129.2-31.88-73.88-31.88-158.17 0-84.28 31.88-158.2 31.88-73.91 87.16-128.74 55.28-54.84 129.18-86.82 73.9-31.99 158.21-31.99 84.3 0 158.25 31.97 73.94 31.97 128.75 86.77 54.82 54.8 86.79 128.88 31.98 74.08 31.98 158.33 0 84.24-31.99 158.07-31.98 73.84-86.82 128.95-54.83 55.1-128.87 87.17Q564.5-74.02 480.3-74.02Zm.2-68.13q140.54 0 238.95-98.75 98.4-98.76 98.4-239.6 0-140.54-98.22-238.95-98.21-98.4-239.75-98.4-140.16 0-238.95 98.22-98.78 98.21-98.78 239.75 0 140.16 98.75 238.95 98.76 98.78 239.6 98.78ZM480-480Z" />
      </svg>
    </div>
  );
}
