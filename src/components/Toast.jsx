import React, { useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
    const Icon = type === "success" ? CheckCircle : AlertCircle;

    return (
        <div className={`fixed top-6 right-6 ${bgColor} text-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg z-50`}>
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{message}</span>
            <button
                onClick={onClose}
                className="ml-2 hover:opacity-70 transition"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Toast;
