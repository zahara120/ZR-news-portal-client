import { Avatar } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
export const ListRelatedNews = () => {
  return (
    <>
      <aside className="gap-4 md:mx-8 my-4 flex flex-col">
        <h1 className="text-xl">Related News</h1>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">Frontend Radio</h4>
            <small className="text-default-500">12 Tracks</small>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={220}
            />
          </CardBody>
        </Card>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">Frontend Radio</h4>
            <small className="text-default-500">12 Tracks</small>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={220}
            />
          </CardBody>
        </Card>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">Frontend Radio</h4>
            <small className="text-default-500">12 Tracks</small>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={220}
            />
          </CardBody>
        </Card>
      </aside>
    </>
  );
};
