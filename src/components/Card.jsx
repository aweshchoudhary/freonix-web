import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="md:p-5 px-3 py-5 border-y border-collapse">
      <Link to="/user">
        <header className="flex items-center justify-between">
          <div className="flex items-center md:gap-5 gap-2">
            <div>
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80"
                alt="post user"
                className="md:w-[60px] md:h-[60px] w-[50px] h-[50px] object-cover rounded-full"
              />
            </div>
            <div>
              <p className="md:text-xl font-medium capitalize">
                awesh choudhary
              </p>
              <p className="md:text-base text-sm">@aweshchoudhary</p>
            </div>
          </div>
          <div>
            <p className="flex items-center gap-1 md:mt-0 mt-3 md:justify-start justify-end">
              <Icon icon="mdi:globe" className="md:text-2xl text-xl" />
              <span className="md:text-base text-sm">12h ago</span>
            </p>
          </div>
        </header>
      </Link>
      <div className="md:mt-8 mt-4">
        <div className="description md:text-base text-sm">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            fugit culpa, eos aspernatur lab.
            <br /> <br />
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque a
            maiore.
          </p>
        </div>
        <div className="media mt-5">
          <img
            src="https://images.unsplash.com/photo-1675575275948-9c0e5cc5ca43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
            alt="post content"
            className="w-full object-contain"
          />
        </div>
      </div>
      <footer className="flex items-center gap-10 mt-4">
        <button className="flex items-center gap-2">
          <Icon icon="mdi:like-outline" className="text-2xl" />
          <span>44</span>
        </button>
        <button className="flex items-center gap-2">
          <Icon icon="uil:comment-dots" className="text-2xl" />
          <span>55</span>
        </button>
        <button className="flex items-center gap-2">
          <Icon icon="ic:baseline-loop" className="text-2xl" />
          <span>1000</span>
        </button>
      </footer>
    </div>
  );
};

export default Card;
