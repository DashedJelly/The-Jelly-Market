import { ConnectWallet, MediaRenderer, useActiveListings, useContract } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { contract } = useContract(
    "0x9b2516Dfa2244F054E12C4414a1aCC5358b80560",
    "marketplace"
  );

  const { data: nfts, isLoading } = useActiveListings(contract);

  function Component() {
    const { contract } = useContract("0xbb71538BB1db7c2C8C5bD78D1b443e440b697d66");
  }

  return (
    <div><ConnectWallet accentColor="#734f96" colorMode="dark" />
    <div className={styles.container} style={{ backgroundImage: "url(https://cdn.discordapp.com/attachments/1026322550415966220/1083612951065399336/Dashed_Jelly_close_up_marco_of_pruple_transparent_liquid_with_b_0d0e317e-98ad-4175-a01d-2493d6ab25a9.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
      <header className={styles.header}>
        <h1 className={styles.title}>The Jelly Market</h1>
        
        
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
    </div>
  );
};

export default Home;
