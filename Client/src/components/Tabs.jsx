/* eslint-disable react/prop-types */

const Tabs = ({ tab, setTab }) => {
	return (
		<div className="flex justify-center ">
			<div
				className=" flex bg-slate-800 text-white justify-center items-center 
			 rounded-full my-2 p-1 gap-1 "
			>
				<button
					className={`text-xl font-semibold p-2 w-24 hover:bg-slate-950 rounded-full
					transition-all duration-200
					${tab === "login" && " bg-slate-950 "}
					`}
					onClick={() => {
						setTab("login");
					}}
				>
					Login
				</button>
				<button
					className={`text-xl font-semibold p-2 w-24 hover:bg-slate-950 rounded-full
					transition-all duration-200
					${tab === "register" && " bg-slate-950 "}
					`}
					onClick={() => {
						setTab("register");
					}}
				>
					Register
				</button>
			</div>
		</div>
	);
};

export default Tabs;
