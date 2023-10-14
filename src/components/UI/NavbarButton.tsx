const NavbarButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  return (
    <button onClick={onClick} className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium   uppercase tracking-wide text-white">
      {children}
    </button>
  );
};

export default NavbarButton;
