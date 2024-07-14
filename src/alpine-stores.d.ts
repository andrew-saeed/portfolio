interface NotificationModal {
    isOpen: boolean;
    title: string;
    body: string;
    open: ({title, body}:{title:string, body:string}) => void;
    close: () => void;
}