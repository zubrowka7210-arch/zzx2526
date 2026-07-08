// DetailPage 数据配置
export const DETAIL_PAGE_DATA = {
  page01: {
    title: ["河源文旅品牌", "年轻化传播策划"],
    description: "挑战杯省银奖项目 · 项目负责人",
    projectNumber: "01",
    totalProjects: "03",
    role: "项目负责人",
    agency: "华南理工大学设计学院",
    year: "2026",
    awards: "广东省\"挑战杯\"银奖",
    portrait: {
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    },
    cards: [
            {
        images: [],
        title: "河源文旅品牌年轻化传播策划",
        description: "挑战杯省银奖项目 · 项目负责人",
      },
      {
        images: ["/case1 heyuan/hy01.png"],
        title: "项目名称",
        description: "\“河源GOGO！四小龙喊你来玩\" ——基于河源\"四小龙\"IP的整体文旅品牌年轻化传播策划方案。",
      },

      {
        images: [],
        title: "背景洞察",
        description: "通过带领团队进行实地采风和问卷调查发现，河源文旅资源丰富，但传达方式偏历史厚重感，对追求\"情绪体验\"和\"社交体验\"的Z世代年轻人不够有吸引力。",
      },
      {
        images: [],
        title: "设计与决策过程",
        description: "基于河源本地的\"四小龙\"IP，提出人格化设计、潮流化表达、场景化渗透三层框架。",
      },
      {
        images: ["/case1 heyuan/hy02.png"],
        title: "",
        description: "",
      },
      {
        images: [],
        title: "",
        description: "通过挖掘河源的本土符号，对IP角色进行深化，给四个形象分别定性格、定场景、定精神内核，让抽象的城市资源变成有辨识度的IP形象。",
      },
      {
        images: ["/case1 heyuan/hy03-1.png", "/case1 heyuan/hy03-2.png", "/case1 heyuan/hy03-3.png", "/case1 heyuan/hy03-4.png"],
        title: "",
        description: "",
      },
      {
        images: [],
        title: "",
        description: "以及河源文旅LOGO视觉焕新，将LOGO色彩和IP色彩统一起来，强化联系。",
      },
      {
        images: ["/case1 heyuan/hy04.png"],
        title: "",
        description: "",
      },
      {
        images: [],
        title: "",
        description: "\"河源F4\"潮酷海报的视觉设计、宣传视频制作，以及与平台分发策略、全年活动策划相配合，把\"四小龙\"IP转译成能在社交媒体上被传播的视觉语言。",
      },
      {
        images: ["/case1 heyuan/hy05-1.png", "/case1 heyuan/hy05-2.png", "/case1 heyuan/hy05-3.png", "/case1 heyuan/hy05-4.png", "/case1 heyuan/hy05-5.png"],
        title: "",
        description: "",
      },
      {
        images: [],
        title: "",
        description: "拓展表情包、票根、冰箱贴等衍生物，让IP渗透进年轻人日常会接触到的具体场景。",
      },
      {
        images: ["/case1 heyuan/hy06-1.png", "/case1 heyuan/hy06-2.png"],
        title: "",
        description: "",
      },
      {
        images: ["/case1 heyuan/hy07-1.png", "/case1 heyuan/hy07-2.png", "/case1 heyuan/hy07-3.png"],
        title: "",
        description: "",
      },
      {
        images: [],
        title: "成果与验证",
        description: "方案获河源市文旅局认可，团队获广东省\"挑战杯\"银奖，项目方法论也是后续生成式AI赋能广东省文旅产业政策研究课题的实践基础。",
      },
    ],
  },
  page02: {
    title: ["面向中国书画的", "智能配乐系统"],
    description: "让AI先读懂中国山水画，再决定该配什么样的音乐",
    tags: ["多模态生成", "Prompt工程", "跨模态评估体系"],
    projectNumber: "02",
    totalProjects: "03",
    role: "项目负责人",
    agency: "西北大学\n信息科学与技术学院",
    year: "2025",
    awards: "本科毕业设计",
    cards: [
      {
        images: [],
        title: "问题定义",
        description: "市面上大多数图像转音乐的方法本质是像素到声音的直接映射，由画面的像素点决定音乐的生成，但面对中国山水画这种依赖留白和气韵传达情绪的作品，效果往往不佳。我想验证的是，能不能先让AI用语言\"读懂\"一幅画，再用这份理解去指导音乐生成，而不是跳过理解这一步直接转换。",
      },
      {
        images: ["/case2 music/框架图.png"],
        title: "",
        description: "",
      },
      {
        images: [],
        title: "设计与决策过程",
        description: "三模型：\nBLIP —— 视觉语义提取：把书画的\"山、水、人\"等具象元素转化为可承载文化美学的语言描述\nLLM(Mistral 7B)——大语言模型：\n• System Prompt让模型\"扮演中国艺术专家角色\"，引入文化语境\n• 把乐器、情感词汇限定在中国传统体系内，避免西乐词汇破坏文化语境\n• 输出JSON结构化数据，并设计了默认保底参数应对解析失败\nAudioLDM2 —— 音乐生成：基于扩散模型，把结构化参数转化为可听的国风音乐",
      },
      {
        images: ["/case2 music/交互界面.png"],
        title: "设计与决策过程",
        description: "产品交互界面展示",
      },
      {
        images: ["/case2 music/花鸟.png"],
        title: "案例展示",
        description: "输入花鸟画生成的音乐",
        audio: "/case2 music/花鸟.wav",
      },
      {
        images: ["/case2 music/山水.png"],
        title: "案例展示",
        description: "输入山水画生成的音乐",
        audio: "/case2 music/山水.wav",
      },
      {
        images: [],
        title: "反思与迭代方向",
        description: "当前系统的瓶颈在旋律结构建模，未来可引入MIDI控制、和声建模。中国传统美学中\"留白\"\"气韵\"等概念的算法化表达仍是开放问题。设想人机协同创作平台，让系统从\"自动生成\"走向\"辅助创作\"。",
      },
      {
        images: [],
        title: "",
        description: "",
        isSpacer: true,
      },
    ],
  },
  page03: {
    title: ["其他作品", "Other Works"],
    description: "包括APP设计、工业设计作品、VR小游戏",
    projectNumber: "03",
    totalProjects: "03",
    role: "设计师",
    agency: "其他作品",
    year: "2025-2026",
    awards: "-",
    cards: [
      {
        images: ["/other/用户1.png", "/other/用户2.png"],
        title: "StudySpot App设计 · 课程作业",
        description: "通过校园田野观察，我们发现一个关键痛点：自习高峰期，学生平均耗费 5–15 分钟 寻找位座，而现有地图工具仅能定位空间，无法回答\"此处是否适合学习\"这一本质问题。",
      },
      {
        images: ["/other/原型1.png", "/other/原型2.png"],
        title: "",
        description: "为此，我们对 3 位典型用户进行民族志观察与深度访谈，聚类提炼出 体验驱动型（陈曦） 与 效率驱动型（吴宁） 两类画像。基于画像，我们评估了 4 个产品方向，最终锚定\"智能学习伙伴\"这一核心定位，并推导出 情境感知、预测性、个性化、社区赋能 四项设计原则。",
      },
      {
        images: ["/other/UI/Background+Shadow.png", "/other/UI/Container.png", "/other/UI/Container-1.png", "/other/UI/Container-2.png", "/other/UI/Container-3.png", "/other/UI/Container-4.png", "/other/UI/Container-5.png", "/other/UI/Container-6.png", "/other/UI/Container-7.png", "/other/UI/Container-8.png"],
        title: "",
        description: "这些原则最终落地为 专注守护浮窗 与 应急方案推荐 等核心功能，通过 9 屏低保真原型的多轮用户测试完成迭代验证。",
      },
      {
        images: [],
        title: "工业设计作品集",
        description: "以用户洞察为起点，以情感化设计为锚点。从宠物健康到女性关怀，每一款产品都始于日常观察，终于真实的体验改善。",
      },
      {
        images: ["/other/设计1-1.png", "/other/设计1-2.png", "/other/设计1-3.png", "/other/设计1-4.png"],
        title: "智能狗狗喂食器",
        description: "关爱狗狗脊椎健康，可调节高度设计，适配中大型犬从幼年到老年的全生命周期需求。智能监控、自动出粮、APP 远程控制。",
      },
      {
        images: ["/other/设计2-1.png", "/other/设计2-2.png", "/other/设计2-3.png"],
        title: "红蝶舱 · 卫生巾零售机",
        description: "以蝴蝶为意象，弱化\"生理用品\"的刻板印象。柔和线条、温馨色彩、隐私保护交互、情感化设计——让应急购买不再尴尬。公共空间中为女性提供\"随时可得的安心\"。满足需求的同时，也传递\"月经，无需遮掩\"的社会态度。",
      },
      {
        images: ["/other/模型1.png", "/other/模型2.png", "/other/模型3.png", "/other/模型4.png"],
        title: "宝箱猎人 VR 小游戏 · 课程作业",
        description: "从零基础起步的Unity开发实践。独立完成一款可运行的VR小游戏,玩家可以在虚拟场景中探索并收集散布在场景各处的宝箱。在没有任何VR开发经验的前提下,我从Unity的基础操作学起,在指导下逐步完成了场景搭建、交互逻辑设计与关卡设计,最终独立产出一个可运行、可交互的完整VR体验。",
      },
    ],
  },
};

export const getDetailPageData = (pageId) => {
  return DETAIL_PAGE_DATA[pageId] || DETAIL_PAGE_DATA.page01;
};
