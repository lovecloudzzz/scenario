import React from 'react';
import {TagsArray} from "./CardTags/CardTags";
import CardAddButton from "./CardAddButton/CardAddButton";

export const Card = () => {
    return (
        <div>
          <div>
              <img/>
          </div>
          <div>
              <div>
                  <a>
                  </a>
                  <a>
                  </a>
                  <TagsArray/>
              </div>
              <div>
                  <a></a>
                  <a></a>
                  <CardAddButton/>
              </div>
          </div>
        </div>
    );
};