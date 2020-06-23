import * as React from "react";
import { useState, useEffect } from "react";

export const PwaInstaller: React.FunctionComponent = () => {
    let deferredPrompt: any;
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    function handleInstall(): void {
        setShowInstallPrompt(false);
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
            } else {
                console.log("User dismissed the A2HS prompt");
            }
            deferredPrompt = null;
        });
    }

    function beforeInstallPrompt(event: Event): void {
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
        return (
            <button className="btn btn-outline-success mr-sm-2 d-none d-xl-inline" onClick={handleInstall} title="Install web application">Install</button>
        );
    }

    return null;
};
