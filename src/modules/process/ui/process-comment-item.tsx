import { Avatar, AvatarFallback, AvatarImage } from "~/shared/ui/avatar";

export const ProcessCommentItem = () => {
  return (
    <div className="flex gap-2">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>ИФ</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-sm">
        <span className="text-muted-foreground">Имя пользователя</span>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium,
          officiis. Aliquid alias quas a officia quibusdam necessitatibus
          asperiores enim expedita, corrupti numquam nesciunt molestiae
          temporibus perspiciatis eum possimus? Quis, nemo.
        </p>
      </div>
    </div>
  );
};
