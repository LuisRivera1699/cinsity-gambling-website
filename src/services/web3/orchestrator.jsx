import { getFoundersPassBalances } from "./founderspass";
import { getWave1Balance } from "./wave1";
import { checkIfUserHasWristband } from "./wristband";

export const getTokensBalances = async (address, setWristbandBalance, setFoundersPassBalances, setWave1Balance) => {
    await checkIfUserHasWristband(address, setWristbandBalance);
    await getFoundersPassBalances(address, setFoundersPassBalances);
    await getWave1Balance(address, setWave1Balance);
}