import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../Header";
import ShimmerLoader from "../ShimmerLoader";

const MangaPage = lazy(() => import("../../pages/MangaPage"));
const ChapterPage = lazy(() => import("../../pages/ChapterPage"));
const MangaListPage = lazy(() => import("../../pages/MangaListPage"));

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Suspense fallback={<ShimmerLoader height={20} width="100%" />}>
          <Switch>
            <Route exact path="/" component={MangaListPage} />
            <Route exact path="/manga/:mangaId" component={MangaPage} />
            <Route
              exact
              path="/manga/:alias/chapter/:chapterId"
              component={ChapterPage}
            />
            <Route
              exact
              path="/manga-by/:key/:value"
              component={MangaListPage}
            />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
