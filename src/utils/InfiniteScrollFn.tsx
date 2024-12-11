import { TProduct } from "@/assets/AllType";
import LoadingSpinner from "@/components/Loding/Loding";
import React, { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteScrollFn = ({
  children,
  post,
  fetchData,
  hasMore,
}: {
  children: ReactNode;
  post: TProduct[];
  fetchData: any;
  hasMore: boolean;
}) => {
  return (
    <div>
      <InfiniteScroll
        dataLength={post?.length} // This is important field to render the next data
        hasMore={hasMore} // Consider making this dynamic based on your data
        loader={<LoadingSpinner />}
        next={fetchData}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // Below props only if you need pull down functionality
      >
        {children}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollFn;
