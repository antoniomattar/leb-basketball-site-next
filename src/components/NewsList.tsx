/* eslint-disable react/jsx-key */
export default async function NewsList(params: any) {
  const newsRequest = await fetch(
    'http://247basketball.live/json_timelineNew.php'
  ).then((response) => response.json());
  const postsNumber = Object.keys(newsRequest);
  const newsList = [];
  for (let i = 0; i < postsNumber.length; i++) {
    newsList.push(newsRequest[postsNumber[i]]);
  }

  return (
    <div id="news" className=" row-auto grid justify-center ">
      <h1 className="m-6 text-center font-mono text-6xl font-bold">NEWS</h1>
      {newsList.map((news: any) => (
        <ul role="list" className=" max-w-sm space-y-5 font-mono text-sm">
          {news.map((newsItem: any) => (
            <li className="m-1 overflow-hidden rounded-3xl bg-yellow-400 px-4 py-4 shadow-lg sm:px-6">
              <div className="flex flex-col justify-start">
                <h2 className="mb-6 text-left font-bold">
                  {newsItem['post'].published_date}
                </h2>
                <p className="mb-6 text-left">{newsItem['post'].content}</p>
              </div>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
