import React from "react";

const Sidebar = () => {
	return (
		<div className="flex flex-col gap-4 w-[300px] p-4 rounded-3xl border border-gray-500/20 bg-white">
			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					<i className="fas fa-rainbow text-xl text-orange-400" />
					<h1 className="text-xl font-extrabold ">InterviewerAI</h1>
				</div>
				<button>
					<i className="fal fa-sidebar text-lg text-gray-500" />
				</button>
			</div>
			<hr className="h-1 text-gray-500/20" />
			<div className="flex items-center gap-3 border border-gray-500/10 rounded-full p-2">
				<div className="p-4 w-12 flex items-center justify-center aspect-square rounded-full bg-yellow-500">
					<i className="fas fa-user" />
				</div>
				<div className="flex flex-col">
					<p className="text-sm">Welcome,</p>
					<h1 className="text-md font-bold ">Ruchiket Borase</h1>
				</div>
			</div>
			<div>routes</div>
			<div className="flex flex-col gap-2 mt-auto">
				{[
					{
						name: "Settings",
						icon: "cog",
					},
				].map((item, i) => (
					<div>
						<button className="flex gap-2 items-center py-2">
							<i className={`far fa-${item.icon} text-md`} />
							{item.name}
						</button>
					</div>
				))}
				<div className="text-xs text-gray-500">
					InterviewerAI V0.0.1
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
