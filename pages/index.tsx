import { ConnectWallet, MediaRenderer, useActiveListings, useContract, } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";


const Home: NextPage = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = document.body;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const { left, top, width, height } = container.getBoundingClientRect();
      const xPercent = (mouseX - left) / width;
      const yPercent = (mouseY - top) / height;
      const lightness = Math.round(yPercent * 20 + 2);
      container.style.backgroundColor = `hsl(280, 190%, ${lightness}%)`;
    };

    document.body.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const { contract } = useContract(
    "0x9b2516Dfa2244F054E12C4414a1aCC5358b80560",
    "marketplace"
  );

  const { data: nfts, isLoading } = useActiveListings(contract);


  function Component() {
    const { contract, } = useContract("0xbb71538BB1db7c2C8C5bD78D1b443e440b697d66");
  }

  return
<div> (
    <header className={styles.header}>
  <img src="/assets/banner.png" alt="The Jelly Market Banner" width="1500" height="500" />
  <ConnectWallet />
</header>
</div>
      </header>
      <main className={styles.main}>
        {!isLoading ? (
          <div className={styles.grid}>
            {nfts &&
              nfts.map((nft) => {
                return (
                  <div key={nft.id} className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <MediaRenderer
                        src={nft.asset.image}
                        height="200px"
                        width="200px"
                      />
                    </div>
                    <p>{nft.asset.name}</p>
                    <p>
                      Price: {nft.buyoutCurrencyValuePerToken.displayValue}{" "}
                      $JELLY
                    </p>
                    <button
                      onClick={async () => {
                        try {
                          await contract?.buyoutListing(
                            BigNumber.from(nft.id),
                            1
                          );
                        } catch (error) {
                          console.error(error);
                          alert(error);
                        }
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                );
              })}
          </div>
        ) : (
          <div>
            <b>Loading...</b>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
