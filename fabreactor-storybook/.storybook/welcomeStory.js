import React from "react";

import { storiesOf } from "@storybook/react";
import { FabreactorList } from "fabreactor";
import FabreactorProvider from "fabreactor-faker";
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

const storeFaker = new FabreactorProvider();
initializeIcons();

storiesOf("Welcome", module).addWithJSX(
    "Fabreactor",

    (() =>
        <FabreactorList views={storeFaker.views} onGetView={storeFaker.onGetView} onNewItem={storeFaker.onNewItem}
            onAddItem={storeFaker.onAddItem}
            onDeleteItem={storeFaker.onDeleteItem} itemProperties={storeFaker.itemProperties} />
    )
);
