import React from "react";

import { storiesOf } from "@storybook/react";
import { FabreactorList } from "fabreactor";
import FakeStore from "fabreactor-faker/src";
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

const storeFaker = new FakeStore();
initializeIcons();

storiesOf("Welcome", module).addWithJSX(
  "Fabreactor",
 
    (() => <FabreactorList views={storeFaker.views} onGetView={storeFaker.onGetView} onNewItem={storeFaker.onNewItem}
        onDeleteItem={storeFaker.onDeleteItem} itemProperties={storeFaker.itemProperties} />)
);
