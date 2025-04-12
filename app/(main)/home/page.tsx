import { Button } from "@/components/ui/button";
import FileUpload from "@/components/upload";

export default function Home() {
	return (
		<div className="flex flex-col gap-4 items-start">
			<h1 className="text-2xl font-extrabold text-gray-500 py-4">
				Get Started{" "}
			</h1>
			<div className="flex gap-3">
				<div className="flex text-md items-center gap-2 w-auto p-4 border border-gray-500/20 rounded-3xl">
					<i className="far fa-file-arrow-up text-lg" />
					Get Started by uploading your resume
				</div>
				<div className="flex text-md items-center gap-2 w-auto p-4 border border-gray-500/20 rounded-3xl">
					<i className="far fa-sparkles" />
					Our AI just got smarter
				</div>
			</div>
			<div className="p-4 flex w-auto flex-col border border-gray-500/20 rounded-3xl">
				<p className="font-bold">Insights</p>
				<div className="relative">
					<div className="absolute flex flex-col gap-2 items-center justify-center w-full h-full backdrop-blur-sm">
						<i className="fas fa-lock text-2xl text-gray-700" />
						<p className="text-sm text-gray-700 font-semibold md:max-w-[200px] text-center">
							Unlock insights by giving your first interview
						</p>
					</div>
					<div className="flex gap-2 items-end p-4 transition-all">
						{Array(20)
							.fill(0)
							.map((_, i) => (
								<div
									style={{
										height: `${Math.random() * 100 || 0}px`,
									}}
									key={i}
									className={`w-2 rounded-full bg-orange-500`}
								></div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
