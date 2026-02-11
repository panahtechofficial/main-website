import { MessageSquare } from "lucide-react";

export default function ServiceCard({ service, className = "" }) {
    const Icon = service.icon;

    return (
        <div
            className={`relative bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden group hover:scale-[1.01] hover:shadow-md hover:rotate-1 hover:cursor-pointer transition-all duration-300 flex flex-col justify-between h-full min-h-[320px] ${className}`}
        >
            <div className="flex justify-between items-start w-full relative z-10">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${service.color}`}>
                    <Icon size={service.variant === "chatbot" ? 36 : 28} />
                </div>
                {service.badge && (
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${service.variant === "chatbot"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 absolute top-3.5 left-20"
                        : "bg-gray-100 dark:bg-zinc-950 text-gray-500 dark:text-zinc-400"
                        }`}>
                        {service.badge}
                    </div>
                )}
            </div>

            {service.hasDecoration && (
                <Icon className="absolute -bottom-6 -right-6 w-40 h-40 text-orange-50 dark:text-orange-900/20 opacity-50 z-0 pointer-events-none group-hover:scale-110 transition-all duration-500" />
            )}
            {service.variant === "chatbot" && (
                <div className="absolute bottom-15 right-8 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-500 z-10">
                    <MessageSquare size={20} />
                </div>
            )}

            <div className="relative z-10 mt-auto pt-8">
                <h3 className={`text-2xl font-bold text-zinc-900 dark:text-white mb-3 ${service.variant === "chatbot" ? "text-xl absolute top-1" : ""}`}>{service.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-[90%]">
                    {service.description}
                </p>
            </div>
        </div>
    );
}
