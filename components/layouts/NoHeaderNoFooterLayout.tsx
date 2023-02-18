export interface INoHeaderNoFooterLayoutProps extends React.ComponentPropsWithoutRef<'div'>{
    
}

const NoHeaderNoFooterLayout: React.FC<INoHeaderNoFooterLayoutProps> = ({ children }) => {
    return  <>
            <main>
                {children}
            </main>
            </>

};

export default NoHeaderNoFooterLayout;