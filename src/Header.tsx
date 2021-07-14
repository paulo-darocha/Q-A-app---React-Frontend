import UserIcon from "./UserIcon";

const Header = () => {

  const onChangeSearchInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.currentTarget.value);
  };

  return (
    <div>
      <a href="./">Q & A</a>
      <input 
        type="text" 
        placeholder="Search..." 
        onChange={onChangeSearchInput}
      />
      <UserIcon />
      <a href="./signin"><span>Sign In</span></a>
    </div>
  );
};

export default Header;