import React from "react";

import { storiesOf } from "@storybook/react";
import { FabricreatorList } from "Fabricreator";
import FakeStore from "Fabricreator-faker/src";
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

const storeFaker = new FakeStore();
initializeIcons();

storiesOf("Welcome", module).addWithJSX(
  "Fabricreator",
 
    (() => <FabricreatorList views={storeFaker.views} onGetView={storeFaker.onGetView} onNewItem={storeFaker.onNewItem}
        onDeleteItem={storeFaker.onDeleteItem} itemProperties={storeFaker.itemProperties} />)
);
