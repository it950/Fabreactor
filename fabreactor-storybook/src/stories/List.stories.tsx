import * as React from "react";

import { storiesOf } from "@storybook/react";
import FakeStore from "fabreactor-faker/src/ListStore";
import './List.module.css';
import { FabreactorList } from "fabreactor/build/lib";

const storeFaker = new FakeStore();
const smallPageFaker = new FakeStore(10, 1);

(storiesOf("Components/List", module) as any)
    .addWithJSX(
        "NL",
    (() => (
        <FabreactorList views={storeFaker.views} onGetView={storeFaker.onGetView} language={"nl-NL"} onNewItem={storeFaker.onNewItem}
            onDeleteItem={storeFaker.onDeleteItem} onSearch={storeFaker.onSearch} itemProperties={storeFaker.itemProperties} />
        ))
    )
    .addWithJSX(
        "Small pagesize",
    (() => (
        <FabreactorList views={smallPageFaker.views} onGetView={smallPageFaker.onGetView} 
                onDeleteItem={smallPageFaker.onDeleteItem} itemProperties={smallPageFaker.itemProperties} />
        ))
    );

