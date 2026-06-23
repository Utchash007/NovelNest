import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles.css";
import Header from "./Header_Components/Header";
import LoginSignup from "./LoginSignup/LoginSignup";
import { useAuth } from "./AuthContext";

// Lazy-loaded route components — each route is its own chunk
const Homepage = lazy(() => import("./Layout/homepage"));
const Novelpage = lazy(() => import("./Layout/Novelpage"));
const ChapterLayout = lazy(() => import("./Layout/ChapterLayout"));
const EditProfileLayout = lazy(() => import("./Layout/EditProfileLayout"));
const SearchResultLayout = lazy(() => import("./Layout/SearchResultLayout"));
const AllNovels = lazy(() => import("./Layout/AllNovels"));
const AdvSearchResultLayout = lazy(() => import("./Layout/AdvSearchResultLayout"));
const Bookmark = lazy(() => import("./Layout/Bookmark"));
const NotFound = lazy(() => import("./Layout/NotFound"));
const ProtectedRoute = lazy(() => import("./PrivateRouter"));

const LoadingFallback = () => (
  <div className="spinner-box">
    <div className="circle-border">
      <div className="circle-core"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingFallback />;

  return (
    <BrowserRouter>
      {isAuthenticated ? <Header /> : null}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/novel/:id" element={<Novelpage />} />
            <Route path="/novel/:novel_id/chapter/:cpt_no" element={<ChapterLayout />} />
            <Route path="/profile/edit" element={<EditProfileLayout />} />
            <Route path="/search/:searchQuery" element={<SearchResultLayout />} />
            <Route path="/novels" element={<AllNovels />} />
            <Route path="/search/advanced" element={<AdvSearchResultLayout />} />
            <Route path="/bookmarks" element={<Bookmark />} />
          </Route>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
