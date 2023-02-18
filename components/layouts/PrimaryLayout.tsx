import Header from "../header/Header";

export interface IPrimaryLayoutProps extends React.ComponentPropsWithoutRef<'div'>{
    
}

const PrimaryLayout: React.FC<IPrimaryLayoutProps> = ({ children }) => {
    return  <>
            {/** header  */}
            <Header />
            <main>
                {children}
            </main>
            {/** footer  */}
            </>

};

export default PrimaryLayout;