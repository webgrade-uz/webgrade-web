import React, { useEffect } from "react";
import { CheckCircle, AlertCircle, X, Copy } from "lucide-react";

const Toast = ({ message, type = "success", onClose, duration = 3000, requestId }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
    const Icon = type === "success" ? CheckCircle : AlertCircle;

    const copyToClipboard = () => {
        if (requestId) {
            navigator.clipboard.writeText(requestId);
        }
    };

    return (
        <div className={`fixed top-6 right-6 ${bgColor} text-white px-6 py-4 rounded-xl shadow-lg z-50 max-w-sm`}>
            <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                    <p className="text-sm font-medium">{message}</p>
                    {requestId && (
                        <div className="mt-2 flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
                            <code className="text-xs font-mono">{requestId}</code>
                            <button
                                onClick={copyToClipboard}
                                className="hover:opacity-70 transition"
                                title="Nusxalash"
                            >
                                <Copy className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="hover:opacity-70 transition flex-shrink-0"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Toast;
