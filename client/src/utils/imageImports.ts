const generateImagePaths = (count: number) => {
  return Array.from(
    { length: count },
    (_, index) =>
      `/img/explore_with_me2_page-${String(index + 1).padStart(4, "0")}.jpg`
  );
};

const imagePaths = generateImagePaths(107);
export default imagePaths;
