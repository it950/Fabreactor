import * as React from "react";

import { storiesOf } from "@storybook/react";
import FakeStore from "fabricreator-faker/src/ListStore";
import './List.module.css';
import { FabricreatorList } from "fabricreator/build/lib";

const storeFaker = new FakeStore();
const smallPageFaker = new FakeStore(10, 1);

(storiesOf("Components/List", module) as any)
    .addWithJSX(
        "NL",
    (() => (
        <FabricreatorList views={storeFaker.views} onGetView={storeFaker.onGetView} language={"nl-NL"} onNewItem={storeFaker.onNewItem}
                onDeleteItem={storeFaker.onDeleteItem} itemProperties={storeFaker.itemProperties} />
        ))
    )
    .addWithJSX(
        "Small pagesize",
        (() => (
            <FabricreatorList views={smallPageFaker.views} onGetView={smallPageFaker.onGetView} 
                onDeleteItem={smallPageFaker.onDeleteItem} itemProperties={smallPageFaker.itemProperties} />
        ))
    );

