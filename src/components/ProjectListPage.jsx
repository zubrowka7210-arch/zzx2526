import { Link } from "react-router-dom";

const projects = [
  { id: "page01", title: "河源文旅", subtitle: "X-01", year: "Y. 2025", image: "./case1 heyuan/hy01.png" },
  { id: "page02", title: "智能配乐", subtitle: "X-02", year: "Y. 2025", image: "./case2 music/花鸟.png" },
  { id: "page03a", detailId: "page03", title: "其他作品", subtitle: "X-03", year: "Y. 2025", image: "./other/设计2-1.png" },
  { id: "page03b", detailId: "page03", title: "其他作品", subtitle: "X-04", year: "Y. 2025", image: "./other/原型2.png" },
];

export default function ProjectListPage() {
  return (
    <main className="w-full my-auto flex flex-col items-center relative">
      <div className="grid grid-cols-2 gap-8 md:gap-16">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/project/${project.detailId || project.id}`}
            className="flex flex-col items-center group"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-32 md:w-40 h-32 md:h-40 rounded-full border-2 border-stone-900 flex flex-col items-center justify-center bg-white">
              <span className="text-xs md:text-sm tracking-widest uppercase text-stone-900 font-medium">{project.subtitle}</span>
              <span className="text-[10px] md:text-xs tracking-widest uppercase text-stone-700 font-medium mt-1">{project.title}</span>
              <span className="text-[10px] md:text-xs tracking-widest uppercase text-stone-500 font-medium mt-2">{project.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
