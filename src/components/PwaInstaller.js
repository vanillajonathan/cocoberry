import * as React from "react";
import { useState, useEffect } from "react";
export const PwaInstaller = () => {
    let deferredPrompt;
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    function handleInstall() {
        setShowInstallPrompt(false);
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
            }
            else {
                console.log("User dismissed the A2HS prompt");
            }
            deferredPrompt = null;
        });
    }
    function beforeInstallPrompt(event) {
        deferredPrompt = event;
        setShowInstallPrompt(true);
    }
    useEffect(() => {
        window.addEventListener("beforeinstallprompt", beforeInstallPrompt);
        return () => {
            window.removeEventListener("beforeinstallprompt", beforeInstallPrompt);
        };
    });
    if (showInstallPrompt) {
        return (React.createElement("div", { className: "card fixed-bottom" },
            React.createElement("div", { className: "card-body" },
                React.createElement("p", null, "Install web application?"),
                React.createElement("button", { className: "btn btn-primary", onClick: handleInstall }, "Install"))));
    }
    return null;
};
//# sourceMappingURL=PwaInstaller.js.map