import * as React from "react";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectCardList, setCardItem } from "@/lib/redux/slices/cardSlice";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@workspace/ui/components/carousel";
import CardImage from "../CardImage";

export default function HomeCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, setCurrent]);

  const cardList = useAppSelector(selectCardList);
  const cardItem = cardList[current - 1];

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(setCardItem(cardItem));
  }, [dispatch, cardItem]);

  return (
    <div className="w-full">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {cardList.map((cardItem) => (
            <CarouselItem key={cardItem.id}>
              <Card>
                <CardContent className="flex items-center justify-center p-0">
                  <CardImage />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
        <div className="py-2 text-center text-xs text-muted-foreground absolute bottom-1 w-full">
          <span className="bg-background opacity-50 rounded-xl px-2">
            {current} of {count}
          </span>
        </div>
      </Carousel>
    </div>
  );
}
