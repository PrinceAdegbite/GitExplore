

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" text-center absolute bottom-0 py-4 max-[760px]:relative">
      
      <p className="text-md font-medium  flex items-center">
        &copy; {currentYear} All rights reserved
      </p>
    </footer>
  );
}